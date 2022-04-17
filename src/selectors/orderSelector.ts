import { QuoteType } from '../domain/models/Quote';
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

export const nowHoverIndexSelector = (store: StoreState) =>
  store.order.nowHoverIndex;
export const nowHoverTypeSelector = (store: StoreState) =>
  store.order.nowHoverType;

export const avgPriceSelector = (store: StoreState) => {
  const order = store.order;
  if (order.nowHoverType === QuoteType.Sell) {
    const dataTable = sellQuoteSelector(store).filter(
      (_s, index) => index >= order.nowHoverIndex && index < MAX_QUOTE
    );
    const total = dataTable.reduce((acc, current) => {
      return acc + Number(current.price);
    }, 0);
    return total / dataTable.length;
  } else if (order.nowHoverType === QuoteType.Buy) {
    const dataTable = buyQuoteSelector(store).filter(
      (_s, index) => index < MAX_QUOTE && index <= order.nowHoverIndex
    );
    const total = dataTable.reduce((acc, current) => {
      return acc + Number(current.price);
    }, 0);
    return total / dataTable.length;
  }
  return 0;
};

export const totalValueSelector = (store: StoreState) => {
  const order = store.order;
  if (order.nowHoverType === QuoteType.Sell) {
    const dataTable = sellQuoteSelector(store).filter(
      (_s, index) => index < MAX_QUOTE && index >= order.nowHoverIndex
    );
    return dataTable.reduce((acc, current) => {
      return (
        acc +
        (Number(current.price) * Number(current.size)) /
          Number(current.cumulativeTotal)
      );
    }, 0);
  } else if (order.nowHoverType === QuoteType.Buy) {
    const dataTable = buyQuoteSelector(store).filter(
      (_s, index) => index < MAX_QUOTE && index <= order.nowHoverIndex
    );
    return dataTable.reduce((acc, current) => {
      return (
        acc +
        (Number(current.price) * Number(current.size)) /
          Number(current.cumulativeTotal)
      );
    }, 0);
  }
  return 0;
};

export const sellQuoteTotalCumulativeSelector = (store: StoreState) => {
  return sellQuoteSelector(store).reduce((acc, current) => {
    return acc + Number(current.cumulativeTotal);
  }, 0);
};

export const buyQuoteTotalCumulativeSelector = (store: StoreState) => {
  return buyQuoteSelector(store).reduce((acc, current) => {
    return acc + Number(current.cumulativeTotal);
  }, 0);
};
