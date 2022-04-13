import { StoreState } from '../reducers/combinedReducer';

const MAX_QUOTE = 8;

export const sellQuoteSelector = (store: StoreState) => {
  return store.order.sellQuote
    .filter((_q, index) => {
      return index < MAX_QUOTE;
    })
    .sort((a, b) => {
      if (Number(a.price) < Number(b.price)) return 1;
      if (Number(a.price) > Number(b.price)) return -1;
      return 0;
    });
};

export const buyQuoteSelector = (store: StoreState) => {
  return store.order.buyQuote.filter((_q, index) => {
    return index < MAX_QUOTE;
  });
};

export const lastPriceSelector = (store: StoreState) => store.order.lastPrice;
export const gainSelector = (store: StoreState) => store.order.gain;
