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
  width: 350px;
  background: #1e2c4c;
  .title {
    color: #fff;
    padding: 10px;
    border-bottom: 1px solid #8698aa;
  }
  .buy-quote-table {
    padding: 5px 15px 10px 15px;
  }
  .sell-quote-table {
    padding: 5px 15px;
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
  gain: Gain.Down,
  timestamp: 123,
  symbol: '',
};

function App() {
  return (
    <Container>
      <div className="title">Order book</div>
      <div className="sell-quote-table">
        <NogleTable
          header={['Price (USD)', 'Size', 'Total']}
          options={fakeData.sellQuote}
          priceColor={PriceColor.Sell}
        />
      </div>
      <NogleLastPrice lastPrice={fakeData.lastPrice} gain={fakeData.gain} />
      <div className="buy-quote-table">
        <NogleTable options={fakeData.buyQuote} priceColor={PriceColor.Buy} />
      </div>
    </Container>
  );
}

export default App;
