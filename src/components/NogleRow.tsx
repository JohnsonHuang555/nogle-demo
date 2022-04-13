import styled from 'styled-components';
import { PriceColor } from '../App';
import { convertPriceFormat } from '../utils/format';

type NogleRowWrapProps = Pick<NogleRowProps, 'priceColor'>;

const NogleRowWrap = styled.div<NogleRowWrapProps>`
  display: flex;
  > div {
    flex: 1;
    text-align: right;
    color: #ffffff;
  }
  .price {
    color: ${(props) => props.priceColor};
  }
`;

type NogleRowProps = {
  price: string;
  size: string;
  cumulativeTotal: string;
  priceColor: PriceColor;
};

const NogleRow = (props: NogleRowProps) => {
  const { price, size, cumulativeTotal, priceColor: quoteType } = props;

  return (
    <NogleRowWrap priceColor={quoteType}>
      <div className="price">{convertPriceFormat(price, 1)}</div>
      <div>{convertPriceFormat(size)}</div>
      <div>{convertPriceFormat(cumulativeTotal)}</div>
    </NogleRowWrap>
  );
};

export default NogleRow;
