import styled from 'styled-components';
import { PriceColor } from '../App';

type NogleRowWrapProps = Pick<NogleRowProps, 'quoteType'>;

const NogleRowWrap = styled.div<NogleRowWrapProps>`
  display: flex;
  > div {
    flex: 1;
    text-align: right;
    color: #ffffff;
  }
  .price {
    color: ${(props) => props.quoteType};
  }
`;

type NogleRowProps = {
  price: string;
  size: string;
  cumulativeTotal: string;
  quoteType: PriceColor;
};

const NogleRow = (props: NogleRowProps) => {
  const { price, size, cumulativeTotal, quoteType } = props;

  return (
    <NogleRowWrap quoteType={quoteType}>
      <div className="price">{price}</div>
      <div>{size}</div>
      <div>{cumulativeTotal}</div>
    </NogleRowWrap>
  );
};

export default NogleRow;
