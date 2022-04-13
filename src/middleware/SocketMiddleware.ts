import { Dispatch, Middleware, MiddlewareAPI } from 'redux';
import { ActionType } from '../actions/SocketAction';
import { OrderFactory } from '../domain/factories/OrderFactory';
import { setOrder } from '../actions/OrderAction';

const SocketMiddleware: Middleware<Dispatch> =
  ({ dispatch, getState }: MiddlewareAPI) =>
  (next) =>
  (action: any) => {
    if (action && action.type) {
      switch (action.type) {
        case ActionType.InitialConnect:
          const ws = new WebSocket('wss://ws.btse.com/ws/futures');
          ws.onopen = () => {
            console.log('open connection');
            const data = {
              op: 'subscribe',
              args: ['orderBookApi:BTCPFC_0'],
            };
            ws.send(JSON.stringify(data));
          };

          ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if (data.data) {
              const order = OrderFactory.createFromNet(data.data);
              dispatch(setOrder(order));
            }
          };

          ws.onclose = () => {
            console.log('close connection');
          };
          break;
      }
    }
    return next(action);
  };

export default SocketMiddleware;
