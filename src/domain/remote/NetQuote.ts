import { Gain } from '../models/Quote';

export type NetOrder = {
  buyQuote: NetQuote[];
  sellQuote: NetQuote[]; // ex. {price: "40114.5", size: "76"}
  lastPrice: string; // ex. "40000.0"
  gain: Gain;
  timestamp: number;
  symbol: string;
};

export type NetQuote = {
  price: string; // ex. "40000.0"
  size: string; // ex. "40000.0"
};
