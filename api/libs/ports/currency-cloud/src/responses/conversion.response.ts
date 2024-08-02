export interface ConversionTypeResponse {
    id: string;
    settlement_date: string;
    conversion_date: string;
    short_reference: string;
    creator_contact_id: string;
    account_id: string;
    currency_pair: string;
    status: string;
    buy_currency: string;
    sell_currency: string;
    client_buy_amount: string;
    client_sell_amount: string;
    fixed_side: string;
    core_rate: string;
    partner_rate: string;
    partner_buy_amount: string;
    partner_sell_amount: string;
    client_rate: string;
    deposit_required: string;
    deposit_amount: string;
    deposit_currency: string;
    deposit_status: string;
    deposit_required_at: string;
    payment_ids: string;
    unallocated_funds: string;
    unique_request_id: string;
    created_at: string;
    updated_at: string;
    mid_market_rate: string;
}
  