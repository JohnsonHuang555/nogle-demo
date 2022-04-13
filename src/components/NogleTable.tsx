import styled from 'styled-components';
import { PriceColor } from '../App';
import { Quote } from '../domain/models/Quote';
import NogleRow from './NogleRow';

const NogleTableWrap = styled.div`
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    margin-bottom: 5px;
    > div {
      flex: 1;
      text-align: right;
      color: #8698aa;
    }
  }
`;

type NogleTableProps = {
  header?: string[];
  options: Quote[];
  priceColor: PriceColor;
};

const NogleTable = (props: NogleTableProps) => {
  const { header, options, priceColor } = props;
  return (
    <NogleTableWrap>
      {header && (
        <div className="header">
          {header.map((h) => (
            <div key={h}>{h}</div>
          ))}
        </div>
      )}
      {options.map(({ price, size, cumulativeTotal }, index) => (
        <NogleRow
          key={index}
          priceColor={priceColor}
          price={price}
          size={size}
          cumulativeTotal={cumulativeTotal}
        />
      ))}
    </NogleTableWrap>
  );
};

export default NogleTable;
