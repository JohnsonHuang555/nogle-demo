import { combineReducers } from 'redux';
import orderReducer, { State as OrderState } from './orderReducer';

export type StoreState = {
  order: OrderState;
};

export default combineReducers({
  order: orderReducer,
});
