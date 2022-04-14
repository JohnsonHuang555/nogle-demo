import './App.css';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NogleTable from './components/NogleTable';
import NogleLastPrice from './components/NogleLastPrice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { InitialConnect } from './actions/SocketAction';
import {
  buyQuoteSelector,
  gainSelector,
  lastPriceSelector,
  sellQuoteSelector,
} from './selectors/orderSelector';
import { convertPriceFormat } from './utils/format';

export enum PriceColor {
  Sell = '#FF5B5A',
  Buy = '#00b15d',
  Default = '#fff',
}

const Container = styled.div`
  margin: 30px;
  width: 350px;
  background: #1e2c4c;
  position: relative;
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

type TooltipProps = {
  width: number;
  top: number;
};

const Tooltip = styled.div<TooltipProps>`
  top: ${(props) => props.top - 74}px;
  right: -${(props) => props.width + 20}px;
  color: white;
  position: absolute;
  background: #57626e;
  padding: 10px;
  border-radius: 5px;
  ::after {
    content: '';
    width: 16px;
    height: 16px;
    background: #57626e;
    left: -8px;
    top: 28px;
    position: absolute;
    transform: rotate(45deg);
  }
  .value {
    font-weight: 600;
  }
`;

function App() {
  const dispatch = useDispatch();
  const sellQuote = useSelector(sellQuoteSelector);
  const buyQuote = useSelector(buyQuoteSelector);
  const lastPrice = useSelector(lastPriceSelector);
  const gain = useSelector(gainSelector);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipTopPosition, setTooltipTopPosition] = useState<number>(0);

  useEffect(() => {
    dispatch(InitialConnect());
  }, [dispatch]);

  const handleMouseOver = (index: number, e: any) => {
    console.log(e);
    setTooltipTopPosition(e.clientY);
  };

  const handleMouseOut = () => {
    console.log('out');
  };

  return (
    <Container>
      <div className="title">Order book</div>
      <div className="sell-quote-table">
        <NogleTable
          header={['Price (USD)', 'Size', 'Total']}
          quotes={sellQuote}
          priceColor={PriceColor.Sell}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
      <NogleLastPrice lastPrice={lastPrice} gain={gain} />
      <div className="buy-quote-table">
        <NogleTable
          quotes={buyQuote}
          priceColor={PriceColor.Buy}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        />
      </div>
      <Tooltip
        ref={tooltipRef}
        width={tooltipRef.current?.clientWidth as number}
        top={tooltipTopPosition}
      >
        <div>
          Avg Price:{' '}
          <span className="value">{convertPriceFormat('10000')}</span> USD
        </div>
        <div>
          Total Value:{' '}
          <span className="value">{convertPriceFormat('10000')}</span> USD
        </div>
      </Tooltip>
    </Container>
  );
}

export default App;
