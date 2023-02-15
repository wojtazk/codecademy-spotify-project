import React, { useState } from 'react';
import './SearchBar.css';

export const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const search = (event) => {
    event.preventDefault();
    onSearch(term);
  };

  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <form className="SearchBar" onSubmit={search}>
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={term}
        onChange={handleTermChange}
      />
      <button className="SearchButton">SEARCH</button>
    </form>
  );
};
