import { AccountType } from '@tools/models';
import { AccountStatus } from './account-status.enum';
import { IdentificationType } from './identification-type.enum';

/** Based on: https://developer.currencycloud.com/docs/item/create-account/ */
export interface CreateOpenPaydAccountDto {
  accountName: string;
  legalEntityType: AccountType;
  street: string;
  city: string;
  country: string;

  postalCode?: string;
  brand?: string;
  yourReference?: string;
  status?: AccountStatus;
  stateOrProvince?: string;
  spreadTable?: string;
  apiTrading?: boolean;
  onlineTrading?: boolean;
  phoneTrading?: boolean;
  identificationType?: IdentificationType;
  identificationValue?: string;
  termsAndConditionsAccepted?: boolean;
}
