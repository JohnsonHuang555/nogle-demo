import styled from 'styled-components';
import { PriceColor } from '../App';

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
      <div className="price">{price}</div>
      <div>{size}</div>
      <div>{cumulativeTotal}</div>
    </NogleRowWrap>
  );
};

export default NogleRow;
