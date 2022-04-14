import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PriceColor } from '../App';
import { convertPriceFormat } from '../utils/format';

type NogleRowWrapProps = Pick<NogleRowProps, 'priceColor'> & {
  isSizeChanged: boolean;
  sizeGainColor: string;
};

const NogleRowWrap = styled.div<NogleRowWrapProps>`
  display: flex;
  padding: 2px 10px;
  &:hover {
    background: #334573;
  }
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
    background: ${(props) => (props.isSizeChanged ? props.sizeGainColor : '')};
  }
`;

type NogleRowProps = {
  price: string;
  size: string;
  cumulativeTotal: string;
  priceColor: PriceColor;
};

const NogleRow = (props: NogleRowProps) => {
  const prevSizeRef = useRef<string>();
  const [isSizeChanged, setIsSizeChanged] = useState(false);
  const [sizeGainColor, setSizeGainColor] = useState<string>('');
  const { price, size, cumulativeTotal, priceColor: quoteType } = props;

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

  const showSizeAnimation = () => {
    setIsSizeChanged(true);
    setTimeout(() => {
      setIsSizeChanged(false);
    }, 500);
  };

  return (
    <NogleRowWrap
      priceColor={quoteType}
      isSizeChanged={isSizeChanged}
      sizeGainColor={sizeGainColor}
    >
      <div className="price">{convertPriceFormat(price, 1)}</div>
      <div className="size">{convertPriceFormat(size)}</div>
      <div>{convertPriceFormat(cumulativeTotal)}</div>
    </NogleRowWrap>
  );
};

export default NogleRow;
