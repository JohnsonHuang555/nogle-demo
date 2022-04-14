import { Gain, Order, Quote } from '../domain/models/Quote';

export enum ActionType {
  LoadedOrder = 'LoadedOrder',
}

export type State = {
  buyQuote: Quote[];
  sellQuote: Quote[];
  lastPrice: string;
  gain: Gain;
  // prevBuyQuote: Quote[];
  // prevSellQuote: Quote[];
};

const initialState: State = {
  buyQuote: [],
  sellQuote: [],
  lastPrice: '',
  gain: Gain.Changed,
  // prevBuyQuote: [],
  // prevSellQuote: [],
};

export type LoadedOrderAction = {
  type: ActionType.LoadedOrder;
  order: Order;
};

type Action = LoadedOrderAction;

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.LoadedOrder: {
      const { buyQuote, sellQuote, lastPrice, gain } = action.order;
      return {
        ...state,
        buyQuote,
        sellQuote,
        lastPrice,
        gain,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
