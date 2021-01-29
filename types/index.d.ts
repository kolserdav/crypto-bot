export type Env = {
  API_KEY_BOT: string;
  API_KEY_COINS: string;
}

export type Currency = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[],
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform: null | string;
  cmc_rank: number;
  last_updated: string;
  quote: {
    [curName: string]: {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      last_updated: string;
    }
  }
};

export type CurrencyResult = {
  status: {
    timestamp: string;
    error_code: boolean;
    error_message: null | string;
    elapsed: number;
    credit_count: number;
    notice: null | string;
    total_count: number;
  }
  data: Currency[];
}