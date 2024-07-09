import { GetWalletBalancesUseCase } from '@domain/use-cases';
import { GetWalletDetailUseCase } from '@domain/use-cases/get-wallet-detail';
import { GetWalletCurrenciesUseCase } from '@domain/use-cases/get-wallet-currencies';
import { GetWalletBalanceDetailUseCase } from '@domain/use-cases/get-wallet-balance-detail';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser, SuccessResponseV2 } from '@tools/misc';
import { ManagerRoles, User, UserRole } from '@tools/models';
import { ViewBalancesRequestDto } from './dto/view-balances.request.dto';
import { ViewBalancesResponseDto } from './dto/view-balances.response.dto';
import { ViewDetailsRequestDto } from './dto/wallet-details.request.dto';
import { WalletsPaginatedDetailResponseDto } from './dto/wallet-details.response.dto';
import { ViewBalancesPaginatedResponseDto } from './dto/view-balances.response.dto';
import { Roles } from '../../auth/roles.decorator';
import { ViewCurrenciesPaginatedResponseDto } from './dto/view-currencies.response.dto';

@ApiTags('Wallets')
@ApiBearerAuth()
@Controller({
  path: 'wallets',
  version: '2',
})
export class WalletsController {
  constructor(
    private readonly getWalletBalancesUseCase: GetWalletBalancesUseCase,
    private readonly getWalletDetailUseCase: GetWalletDetailUseCase,
    private readonly getWalletBalanceDetailUseCase: GetWalletBalanceDetailUseCase,
    private readonly getWalletCurrenciesUseCase: GetWalletCurrenciesUseCase,
  ) {}

  /**
   * get currencies by operation
   */
  @Get('currencies')
  @Roles(...ManagerRoles, UserRole.TeamMember, UserRole.ViewerUser)
  async viewCurrencies(
    @GetUser() user: User,
  ): Promise<ViewCurrenciesPaginatedResponseDto> {
    const result = await this.getWalletCurrenciesUseCase.handle(user);
    return new SuccessResponseV2(result);
  }

  /**
   * get balances by operation
   */
  @Get('balances')
  @Roles(...ManagerRoles, UserRole.TeamMember, UserRole.ViewerUser)
  async viewBalances(
    @Query() balancesRequest: ViewBalancesRequestDto,
    @GetUser() user: User,
  ): Promise<ViewBalancesPaginatedResponseDto> {
    const result = await this.getWalletBalancesUseCase.handle(user);
    return new SuccessResponseV2(result);
  }

  /**
   * get balance by currency
   */
  @Get('balance/:currency')
  @Roles(...ManagerRoles, UserRole.TeamMember, UserRole.ViewerUser)
  async getBalance(
    @Param('currency') currency: string,
    @GetUser() user: User,
  ): Promise<SuccessResponseV2<ViewBalancesResponseDto>> {
    const balance = await this.getWalletBalanceDetailUseCase.handle(
      currency,
      user,
    );
    return new SuccessResponseV2(balance);
  }

  /**
   * get wallets details
   */
  @Get('details')
  @Roles(...ManagerRoles, UserRole.TeamMember, UserRole.ViewerUser)
  async walletDetails(
    @Query() query: ViewDetailsRequestDto,
    @GetUser() user: User,
  ): Promise<WalletsPaginatedDetailResponseDto> {
    const { data, pagination } = await this.getWalletDetailUseCase.handle(
      query,
      user,
    );
    return new SuccessResponseV2(data, pagination);
  }
}
