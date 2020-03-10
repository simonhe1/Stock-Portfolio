import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const SearchBar = props => {
    const [searchItem,setSearchItem] = useState('');
    const handleChange = e => {
        let searchTerm = e.target.value;
        setSearchItem(searchTerm);
    }

    const handleSearch = () => {
        props.handleSearch(searchItem);
    }

    return (
        <div>
            <input type="text" onChange={e => handleChange(e)} value={searchItem} /> 
            <Button variant="danger" onClick={e => handleSearch()}>Search</Button>
        </div>
    );
}
 
export default SearchBar;