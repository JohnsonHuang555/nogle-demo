export enum Gain {
  Up = 1,
  Down = -1,
  Changed = 0,
}

export type Order = {
  buyQuote: Quote[];
  sellQuote: Quote[];
  lastPrice: string; // 在 factory 就轉好 comma 格式
  gain: Gain;
  timestamp: number;
  symbol: string;
};

export type Quote = {
  price: string;
  size: string;
  cumulativeTotal: string;
  // sizeGain?: Gain; // size 增加還是減少
  // isSizeChanged?: boolean; // 判斷該價錢有無變更
};
