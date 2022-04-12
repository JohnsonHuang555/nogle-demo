import './App.css';
import React from 'react';
import styled from 'styled-components';
import { Gain, Order } from './domain/models/Quote';
import NogleTable from './components/NogleTable';
import NogleLastPrice from './components/NogleLastPrice';

export enum PriceColor {
  Sell = '#FF5B5A',
  Buy = '#00b15d',
  Default = '#fff',
}

const Container = styled.div`
  margin: 30px;
  width: 400px;
  background: #1e2c4c;
  .title {
    color: #fff;
    padding: 10px;
    border-bottom: 1px solid #fff;
  }
  .buy-quote-table,
  .sell-quote-table {
    padding: 0 15px;
  }
  .last-price {
  }
`;

const fakeData: Order = {
  buyQuote: [
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
  ],
  sellQuote: [
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
    {
      price: '47,110.0',
      size: '217',
      cumulativeTotal: '4552',
    },
  ],
  lastPrice: '9999',
  gain: Gain.Up,
  timestamp: 123,
  symbol: '',
};

function App() {
  return (
    <Container>
      <div className="title">Order book</div>
      <div className="sell-quote-table">
        <NogleTable
          options={fakeData.sellQuote}
          header={['Price (USD)', 'Size', 'Total']}
        />
      </div>
      <NogleLastPrice lastPrice={fakeData.lastPrice} gain={fakeData.gain} />
      <div className="buy-quote-table"></div>
    </Container>
  );
}

export default App;
