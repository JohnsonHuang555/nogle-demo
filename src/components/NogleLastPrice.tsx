import styled from 'styled-components';
import { PriceColor } from '../App';
import { Gain } from '../domain/models/Quote';
import Arrow from './icons/Arrow';

type NogleLastPriceWrapProps = {
  color: PriceColor;
  isRotate: boolean;
};

const NogleLastPriceWrap = styled.div<NogleLastPriceWrapProps>`
  .last-price {
  }
  svg {
    color: ${(props) => props.color};
    transform: ${(props) => (props.isRotate ? 'rotate(180deg)' : '')};
  }
`;

type NogleLastPriceProps = {
  lastPrice: string;
  gain: Gain;
};

const NogleLastPrice = (props: NogleLastPriceProps) => {
  const { lastPrice, gain } = props;

  const getColor = (): NogleLastPriceWrapProps => {
    switch (gain) {
      case Gain.Up:
        return {
          color: PriceColor.Buy,
          isRotate: true,
        };
      case Gain.Down:
        return {
          color: PriceColor.Sell,
          isRotate: false,
        };
      default:
        return {
          color: PriceColor.Sell,
          isRotate: false,
        };
    }
  };

  return (
    <NogleLastPriceWrap color={getColor().color} isRotate={getColor().isRotate}>
      <div className="last-price">{lastPrice}</div>
      <Arrow />
    </NogleLastPriceWrap>
  );
};

export default NogleLastPrice;
