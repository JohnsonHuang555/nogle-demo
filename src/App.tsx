import './App.css';
import { useEffect } from 'react';
import styled from 'styled-components';
import NogleTable from './components/NogleTable';
import NogleLastPrice from './components/NogleLastPrice';
import { useDispatch, useSelector } from 'react-redux';
import { InitialConnect } from './actions/SocketAction';
import {
  buyQuoteSelector,
  gainSelector,
  lastPriceSelector,
  sellQuoteSelector,
} from './selectors/orderSelector';

export enum PriceColor {
  Sell = '#FF5B5A',
  Buy = '#00b15d',
  Default = '#fff',
}

const Container = styled.div`
  margin: 30px;
  width: 350px;
  background: #1e2c4c;
  .title {
    color: #fff;
    padding: 10px;
    border-bottom: 1px solid #8698aa;
  }
  .sell-quote-table {
    padding-bottom: 5px;
  }
  .buy-quote-table {
    padding-top: 5px;
    padding-bottom: 10px;
  }
`;

function App() {
  const dispatch = useDispatch();
  const sellQuote = useSelector(sellQuoteSelector);
  const buyQuote = useSelector(buyQuoteSelector);
  const lastPrice = useSelector(lastPriceSelector);
  const gain = useSelector(gainSelector);

  useEffect(() => {
    dispatch(InitialConnect());
  }, [dispatch]);

  return (
    <Container>
      <div className="title">Order book</div>
      <div className="sell-quote-table">
        <NogleTable
          header={['Price (USD)', 'Size', 'Total']}
          options={sellQuote}
          priceColor={PriceColor.Sell}
        />
      </div>
      <NogleLastPrice lastPrice={lastPrice} gain={gain} />
      <div className="buy-quote-table">
        <NogleTable options={buyQuote} priceColor={PriceColor.Buy} />
      </div>
    </Container>
  );
}

export default App;
