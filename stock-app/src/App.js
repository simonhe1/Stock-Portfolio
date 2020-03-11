import React, { useState, useEffect } from 'react';
import Portfolio from './Portfolio';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import NavBar from './NavBar';
import axios from 'axios';
import Transactions from './Transactions';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

const App = () => {
  const [balance,setBalance] = useState(5000);
  const [stockToBeSearched,setStockToBeSearched] = useState('MSFT');
  const [stockSearched,setStockSearched] = useState(0);
  const [isSearching,setIsSearching] = useState(true);
  const [prices,setPrices] = useState(0.0);
  const [searchTerm,setSearchTerm] = useState('');
  const [isSearchingResults,setIsSearchingResults] = useState(false);
  const [searching,setSearching] = useState(0);
  const [searchData,setSearchData] = useState([]);
  const [transactions,setTransactions] = useState([]);

  useEffect(() => {
    let url = 'https://www.alphavantage.co/query?';
    let func = 'TIME_SERIES_INTRADAY';
    let symbol = stockToBeSearched;
    let apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    let interval = '5min';
    axios.get(`${url}function=${func}&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`)
    .then(json => {
      console.log(json);
      return json.data['Time Series (5min)'];
    })
    .then(data => {
        setPrices(Object.entries(data)[0][1]['4. close'])
    })
    .then(() => {
      setIsSearching(true);
    });
  },[stockSearched]);

  useEffect(() => {
    let url = 'https://www.alphavantage.co/query?';
    let func = 'SYMBOL_SEARCH';
    let keywords = searchTerm;
    let apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    axios.get(`${url}function=${func}&keywords=${keywords}&apikey=${apiKey}`)
    .then(json => {
        return json.data['bestMatches'];
    })
    .then(data => {
        setSearchData(data);
    })
    .then(() =>{
      setIsSearchingResults(true);
    });
  },[searching]);

  const handlePurchase = (company,shares,val) => {
    setBalance((balance - val).toFixed(2));
    let trans = transactions;
    trans.push({
      "symbol": company,
      "amount": shares,
      "price": val,
    });
    setTransactions(trans)
    // Will append values to database
    setIsSearching(false);
  }

  const handleSearchResults = term => {
    setSearchTerm(term);
  }

  const incrementSearchCounter = () => {
    setSearching(searching + 1);
  }

  const updateSearchTerm = symbol => {
    setStockSearched(stockSearched + 1);
    setStockToBeSearched(symbol);
  }

  return (
    <React.Fragment>
      <NavBar />
      {balance}
      <Portfolio 
        stockName={stockToBeSearched}
        searchMode={isSearching}
        price={prices}
        userBalance={balance}
        handleBuy={handlePurchase}
      />
      <SearchBar
        handleSearchTerm={handleSearchResults}
        changeSearchCounter={incrementSearchCounter}
      />
      <SearchResults 
        showResults={isSearchingResults}
        term={searchTerm}
        results={searchData}
        searchCompany={updateSearchTerm}
      />
      <Transactions 
        trans={transactions}
      />
    </React.Fragment>
  );
}

export default App;
