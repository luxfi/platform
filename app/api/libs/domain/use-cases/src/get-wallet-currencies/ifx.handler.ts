import { PaymentProviderIFX } from '@ports/ifx';
import { GetWalletCurrenciesUseCase } from './abstract.handler';
import { CurrenciesNameIfx, IFXCurrencies } from '@tools/models';
import { ViewCurrenciesResponse } from './balances.response.type';

export class GetWalletCurrenciesIFXUseCase extends GetWalletCurrenciesUseCase {
  /**
   * any other injections in order, after paymentProvider and request
   */
  constructor(
    protected paymentProvider: PaymentProviderIFX,
    private request: Request,
    private beneficiariesService: any,
  ) {
    super();
  }

  async handle(): Promise<ViewCurrenciesResponse[]> {
    const wallets = await this.paymentProvider.getWallets();

    const walletBalancesPromise = wallets.data.map((wallet) =>
      this.paymentProvider.getWalletBalances(wallet.id),
    );

    const walletBalances = await Promise.all(walletBalancesPromise);

    const allCurrencies = IFXCurrencies.map((ifxCurrency) => ({
      currency: ifxCurrency.currency,
      name: ifxCurrency.name,
    }));

    const balances = walletBalances.flatMap((wallet) =>
      wallet.balances.map((balance) => ({
        currency: balance.currency,
      })),
    );

    const currencies = allCurrencies.filter(
      (c) => !balances.find((b) => b.currency === c.currency),
    );

    return currencies as ViewCurrenciesResponse[];
  }
}
