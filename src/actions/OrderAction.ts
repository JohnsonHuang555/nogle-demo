import { Order, QuoteType } from '../domain/models/Quote';
import { ActionType } from '../reducers/orderReducer';

export const setOrder = (order: Order) => {
  return {
    type: ActionType.LoadedOrder,
    order,
  };
};

export const setTooltip = (hoverIndex: number, quoteType: QuoteType | '') => {
  return {
    type: ActionType.ShowTooltip,
    hoverIndex,
    quoteType,
  };
};
