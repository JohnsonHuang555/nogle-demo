import styled from 'styled-components';
import { PriceColor } from '../App';
import { Gain } from '../domain/models/Quote';
import { convertPriceFormat } from '../utils/format';
import Arrow from './icons/Arrow';

type NogleLastPriceWrapProps = {
  color: PriceColor;
  isRotate: boolean;
  backgroundColor: string;
};

const NogleLastPriceWrap = styled.div<NogleLastPriceWrapProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.backgroundColor};
  padding: 2px;
  .last-price {
    color: ${(props) => props.color};
    font-size: 26px;
    margin-right: 5px;
    margin-bottom: 3px;
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
          backgroundColor: 'rgba(16, 186, 104, 0.12)',
          isRotate: true,
        };
      case Gain.Down:
        return {
          color: PriceColor.Sell,
          backgroundColor: 'rgba(255, 90, 90, 0.12)',
          isRotate: false,
        };
      default:
        return {
          color: PriceColor.Sell,
          backgroundColor: '#fff',
          isRotate: false,
        };
    }
  };

  return (
    <NogleLastPriceWrap
      color={getColor().color}
      isRotate={getColor().isRotate}
      backgroundColor={getColor().backgroundColor}
    >
      <div className="last-price">{convertPriceFormat(lastPrice, 1)}</div>
      <Arrow />
    </NogleLastPriceWrap>
  );
};

export default NogleLastPrice;
