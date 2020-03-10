import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import SearchBar from './SearchBar';
import axios from 'axios';
require('dotenv').config();

const App = () => {
  const [balance,setBalance] = useState(5000);
  const [stockToBeSearched,setStockToBeSearched] = useState('MSFT');
  const [isSearching,setIsSearching] = useState(true);
  const [prices,setPrices] = useState(0.0);

  useEffect(() => {
    let url = 'https://www.alphavantage.co/query?';
    let func = 'TIME_SERIES_INTRADAY';
    let symbol = stockToBeSearched;
    let apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    let interval = '5min';
    axios.get(`${url}function=${func}&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`)
    .then(json => {
        return json.data['Time Series (5min)'];
    })
    .then(data => {
        setPrices(Object.entries(data)[0][1]['4. close'])
    });
  },[])

  const searchStock = name => {
    else {
      setStockToBeSearched(name);
      setIsSearching(true);
    }
  }

  const handlePurchase = (company,val) => {
    setBalance((balance - val).toFixed(2));
    // Will append values to database
    setIsSearching(false);
  }

  return (
    <React.Fragment>
      {balance}
      <Portfolio 
        stockName={stockToBeSearched}
        searchMode={isSearching}
        price={prices}
        userBalance={balance}
        handleBuy={handlePurchase}
      />
      <SearchBar 
        handleSearch={searchStock}
      />
    </React.Fragment>
  );
}

export default App;
