import { Order, Quote } from '../models/Quote';
import { NetOrder } from '../remote/NetQuote';

export class OrderFactory {
  // 這邊要去把 net 資料轉換成 domain 的形狀，直接給 UI 端吃
  static createFromNet(netOrder: NetOrder): Order {
    const buyQuote = netOrder.buyQuote.reduce<Quote[]>(
      (accumulate, current, currentIndex) => {
        const cumulativeTotal = accumulate[currentIndex - 1]
          ? Number(accumulate[currentIndex - 1].cumulativeTotal) +
            Number(current.size)
          : Number(current.size);
        accumulate.push({
          price: current.price,
          size: current.size,
          cumulativeTotal: cumulativeTotal.toString(),
        });
        return accumulate;
      },
      []
    );

    const sellQuote = netOrder.sellQuote
      .sort((a, b) => {
        if (Number(a.price) > Number(b.price)) return 1;
        if (Number(a.price) < Number(b.price)) return -1;
        return 0;
      })
      .reduce<Quote[]>((accumulate, current, currentIndex) => {
        const cumulativeTotal = accumulate[currentIndex - 1]
          ? Number(accumulate[currentIndex - 1].cumulativeTotal) +
            Number(current.size)
          : Number(current.size);
        accumulate.push({
          price: current.price,
          size: current.size,
          cumulativeTotal: cumulativeTotal.toString(),
        });
        return accumulate;
      }, []);

    return {
      buyQuote,
      sellQuote,
      lastPrice: netOrder.lastPrice,
      gain: netOrder.gain,
      timestamp: netOrder.timestamp,
      symbol: netOrder.symbol,
    };
  }
}
