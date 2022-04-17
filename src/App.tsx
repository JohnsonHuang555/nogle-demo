import './App.css';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NogleTable from './components/NogleTable';
import NogleLastPrice from './components/NogleLastPrice';
import { useDispatch, useSelector } from 'react-redux';
import { InitialConnect } from './actions/SocketAction';
import {
  avgPriceSelector,
  buyQuoteSelector,
  gainSelector,
  lastPriceSelector,
  nowHoverIndexSelector,
  nowHoverTypeSelector,
  sellQuoteSelector,
  totalValueSelector,
} from './selectors/orderSelector';
import { convertPriceFormat } from './utils/format';
import { QuoteType } from './domain/models/Quote';
import { setTooltip } from './actions/OrderAction';

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
  top: number;
  width: number;
};

const Tooltip = styled.div<TooltipProps>`
  top: ${(props) => props.top}px;
  right: -${(props) => props.width + 11}px;
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
  const nowHoverIndex = useSelector(nowHoverIndexSelector);
  const nowHoverType = useSelector(nowHoverTypeSelector);
  const avgPrice = useSelector(avgPriceSelector);
  const totalValue = useSelector(totalValueSelector);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTopPosition, setTooltipTopPosition] = useState<number>(0);

  useEffect(() => {
    dispatch(InitialConnect());
  }, [dispatch]);

  useEffect(() => {
    if (nowHoverIndex !== -1) {
      if (nowHoverType === QuoteType.Sell) {
        setTooltipTopPosition(50 + nowHoverIndex * 31);
      } else {
        setTooltipTopPosition(380 + nowHoverIndex * 31);
      }
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  }, [nowHoverIndex, nowHoverType]);

  const handleSellQuoteMouseOver = (index: number) => {
    dispatch(setTooltip(index, QuoteType.Sell));
  };

  const handleBuyQuoteMouseOver = (index: number) => {
    dispatch(setTooltip(index, QuoteType.Buy));
  };

  const handleMouseLeave = () => {
    dispatch(setTooltip(-1, ''));
  };

  return (
    <Container>
      <div className="title">Order book</div>
      <div className="sell-quote-table">
        <NogleTable
          header={['Price (USD)', 'Size', 'Total']}
          quotes={sellQuote}
          priceColor={PriceColor.Sell}
          onMouseEnter={handleSellQuoteMouseOver}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <NogleLastPrice lastPrice={lastPrice} gain={gain} />
      <div className="buy-quote-table">
        <NogleTable
          quotes={buyQuote}
          priceColor={PriceColor.Buy}
          onMouseEnter={handleBuyQuoteMouseOver}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      {showTooltip && (
        <Tooltip
          top={tooltipTopPosition}
          ref={tooltipRef}
          width={tooltipRef.current?.clientWidth as number}
        >
          <div>
            Avg Price:{' '}
            <span className="value">
              {convertPriceFormat(String(avgPrice.toFixed(1)), 1)}
            </span>{' '}
            USD
          </div>
          <div>
            Total Value:{' '}
            <span className="value">
              {convertPriceFormat(String(totalValue.toFixed(1)))}
            </span>{' '}
            USD
          </div>
        </Tooltip>
      )}
    </Container>
  );
}

export default App;
