import React from 'react';
const SearchResults = props => {
    
    const searchCompany = company => {
        props.searchCompany(company);
    }

    const displayResults = () => {
        const { results } = props;
        if(results === undefined){
            return (
                <React.Fragment>
                </React.Fragment>
            )
        }
        if(props.showResults){
            let arrOfResults = [];
            results.forEach((match,counter) => {
                let symbol = match['1. symbol'];
                let name = match['2. name'];
                arrOfResults.push(
                    <tr 
                        key={counter}
                        onClick={e => searchCompany(symbol)}
                    >
                        <td>{symbol}</td>
                        <td>{name}</td>
                    </tr>
                )
            })
            let table = (
                <table>
                    <caption>Search Results for {props.term}</caption>
                    <tbody>
                        {arrOfResults}
                    </tbody>
                </table>
            );
            return table;
        }else{
            return (
                <React.Fragment>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            {displayResults()}
        </React.Fragment>
    );
}
export default SearchResults;