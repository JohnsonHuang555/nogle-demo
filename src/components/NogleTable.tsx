import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { PriceColor } from '../App';
import { Quote } from '../domain/models/Quote';
import { convertPriceFormat } from '../utils/format';
import NogleRow from './NogleRow';

const NogleTableWrap = styled.div`
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    margin-bottom: 5px;
    padding: 2px 10px;
    > div {
      flex: 1;
      text-align: right;
      color: #8698aa;
    }
  }
`;

type NogleTableProps = {
  header?: string[];
  quotes: Quote[];
  priceColor: PriceColor;
  onMouseOver: (index: number, e: any) => void;
  onMouseOut: () => void;
};

const NogleTable = (props: NogleTableProps) => {
  const prevQuotesRef = useRef<string[]>();
  const { header, quotes, priceColor, onMouseOver, onMouseOut } = props;
  const [newQuotes, setNewQuotes] = useState<string[]>();

  const quotesPrices = useMemo(() => {
    return quotes.map((q) => q.price);
  }, [quotes]);

  useEffect(() => {
    const nq = quotesPrices.filter((q) => !prevQuotesRef.current?.includes(q));
    setNewQuotes(nq);
    // 存前一個值
    prevQuotesRef.current = quotesPrices;
  }, [quotesPrices]);

  return (
    <NogleTableWrap>
      {header && (
        <div className="header">
          {header.map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>
      )}
      {quotes.map(({ price, size, cumulativeTotal }, index) => (
        <NogleRow
          index={index}
          key={price}
          priceColor={priceColor}
          price={price}
          size={size}
          cumulativeTotal={cumulativeTotal}
          newQuotes={newQuotes}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        />
      ))}
    </NogleTableWrap>
  );
};

export default NogleTable;
