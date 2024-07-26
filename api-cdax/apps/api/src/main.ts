import * as dotenv from 'dotenv';

dotenv.config({ path: './apps/api/.env' });

import cookieParser from 'cookie-parser';

import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

function buildSwagger(app) {
    // set up swagger
    const config = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('CDAXForex API')
        .setDescription('')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.use(Sentry.Handlers.requestHandler());
    expressApp.use(Sentry.Handlers.tracingHandler());
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            new Sentry.Integrations.Http({ tracing: true }),
            new Tracing.Integrations.Express({
                app: expressApp,
            }),
            new Tracing.Integrations.Postgres(),
        ],
    });

    const rawBodyBuffer = (req, res, buf) => {
        if (buf && buf.length)
            req.rawBody = buf.toString('utf8');
    };

    app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true, limit: '50mb'}));
    app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '50mb' }));

    // enable CORS
    const origin =
        /(localhost:[0-9]{2,4}|cdaxforex\.com|cdaxforex\.com:[0-9]{2,4}|www.recaptcha.net|([a-zA-Z0-9-]+\.)*tokenology\.com)$/i;

    app.enableCors({
        origin,
        credentials: true
    });

    // enable cookie support
    app.use(cookieParser());

    //increase payload limit
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    app.use(helmet());

    // set global prefix
    app.setGlobalPrefix('api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1'
    });

    buildSwagger(app);

    app.use(
        Sentry.Handlers.errorHandler({
            shouldHandleError: (error) => true,
        })
    );

    await app.listen(process.env.PORT || 3000);
}
bootstrap();