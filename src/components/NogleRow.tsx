import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PriceColor } from '../App';
import { convertPriceFormat } from '../utils/format';

type NogleRowWrapProps = Pick<NogleRowProps, 'priceColor'> & {
  isSizeChanged: boolean;
  sizeGainColor: string;
  isNewQuote: boolean;
  newQuoteColor: string;
  showHoverBackground: boolean;
};

const NogleRowWrap = styled.div<NogleRowWrapProps>`
  display: flex;
  padding: 2px 10px;
  transition: all 0.3s;
  background: ${(props) => (props.isNewQuote ? props.newQuoteColor : '')};
  > div {
    flex: 1;
    text-align: right;
    color: #ffffff;
  }
  .price {
    color: ${(props) => props.priceColor};
  }
  .size {
    transition: all 0.3s;
    margin-left: 10px;
    background: ${(props) => (props.isSizeChanged ? props.sizeGainColor : '')};
  }
`;

const TotalWrap = styled.div`
  position: relative;
`;

type RatioWrapProps = Pick<NogleRowProps, 'priceColor' | 'cumulativeRatio'>;

const RatioWrap = styled.div<RatioWrapProps>`
  position: absolute;
  background: ${(props) => {
    if (props.priceColor === PriceColor.Sell) {
      return 'rgba(255, 91, 90, 0.5)';
    } else {
      return 'rgba(0, 177, 93, 0.5)';
    }
  }};
  top: 0;
  height: 100%;
  width: ${(props) => props.cumulativeRatio}%;
  left: 10px;
`;

type NogleRowProps = {
  index: number;
  price: string;
  size: string;
  cumulativeTotal: string;
  priceColor: PriceColor;
  newQuotes?: string[];
  showHoverBackground: boolean;
  cumulativeRatio: string;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
};

const NogleRow = (props: NogleRowProps) => {
  const {
    index,
    price,
    size,
    cumulativeTotal,
    priceColor,
    newQuotes,
    showHoverBackground,
    cumulativeRatio,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const prevSizeRef = useRef<string>();
  const rowRef = useRef<HTMLDivElement>(null);
  const [isSizeChanged, setIsSizeChanged] = useState(false);
  const [sizeGainColor, setSizeGainColor] = useState<string>('');
  const [isNewQuote, setIsNewQuote] = useState(false);
  const [newQuoteColor, setNewQuoteColor] = useState<string>('');

  useEffect(() => {
    if (prevSizeRef.current) {
      if (size > prevSizeRef.current) {
        setSizeGainColor('rgba(255, 91, 90, 0.5)');
        showSizeAnimation();
      } else if (size < prevSizeRef.current) {
        setSizeGainColor('rgba(0, 177, 93, 0.5)');
        showSizeAnimation();
      }
    }
    // 存前一個值
    prevSizeRef.current = size;
  }, [size]);

  useEffect(() => {
    if (newQuotes?.length && newQuotes.includes(price)) {
      if (priceColor === PriceColor.Sell) {
        setNewQuoteColor('rgba(255, 91, 90, 0.5)');
      } else {
        setNewQuoteColor('rgba(0, 177, 93, 0.5)');
      }
      showRowAnimation();
    }
  }, [newQuotes]);

  const showSizeAnimation = () => {
    setIsSizeChanged(true);
    setTimeout(() => {
      setIsSizeChanged(false);
    }, 500);
  };

  const showRowAnimation = () => {
    setIsNewQuote(true);
    setTimeout(() => {
      setIsNewQuote(false);
    }, 100);
  };

  // 把 callback 保存起來，節省效能，不然會因為 props 變了會一直觸發
  // const memoryMouseEnter = useCallback(() => onMouseEnter(index), [index]);

  return (
    <NogleRowWrap
      ref={rowRef}
      priceColor={priceColor}
      isSizeChanged={isSizeChanged}
      sizeGainColor={sizeGainColor}
      isNewQuote={isNewQuote}
      newQuoteColor={newQuoteColor}
      showHoverBackground={showHoverBackground}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
    >
      <div className="price">{convertPriceFormat(price, 1)}</div>
      <div className="size">{convertPriceFormat(size)}</div>
      <TotalWrap>
        <RatioWrap priceColor={priceColor} cumulativeRatio={cumulativeRatio} />
        {convertPriceFormat(cumulativeTotal)}
      </TotalWrap>
    </NogleRowWrap>
  );
};

export default NogleRow;
