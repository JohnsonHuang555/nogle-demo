import { Gain, Order, Quote, QuoteType } from '../domain/models/Quote';

export enum ActionType {
  LoadedOrder = 'LoadedOrder',
  ShowTooltip = 'ShowTooltip',
}

export type State = {
  buyQuote: Quote[];
  sellQuote: Quote[];
  lastPrice: string;
  gain: Gain;
  nowHoverIndex: number;
  nowHoverType: QuoteType | '';
};

const initialState: State = {
  buyQuote: [],
  sellQuote: [],
  lastPrice: '',
  gain: Gain.Changed,
  nowHoverIndex: -1,
  nowHoverType: '',
};

export type LoadedOrderAction = {
  type: ActionType.LoadedOrder;
  order: Order;
};

export type ShowTooltipAction = {
  type: ActionType.ShowTooltip;
  hoverIndex: number;
  quoteType: QuoteType;
};

type Action = LoadedOrderAction | ShowTooltipAction;

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
    case ActionType.ShowTooltip: {
      return {
        ...state,
        nowHoverIndex: action.hoverIndex,
        nowHoverType: action.quoteType,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
