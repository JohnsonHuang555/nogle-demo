import { Order } from '../domain/models/Quote';
import { ActionType } from '../reducers/orderReducer';

export const setOrder = (order: Order) => {
  return {
    type: ActionType.LoadedOrder,
    order,
  };
};
