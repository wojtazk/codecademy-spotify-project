import React, { useState } from 'react';
import { Spotify } from '../../util/Spotify';
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
    <form
      className="SearchBar"
      onSubmit={search}
      onFocus={() => Spotify.getAccessToken()}
    >
      <input
        placeholder="Enter A Song, Album, or Artist"
        value={term}
        onChange={handleTermChange}
      />
      <button className="SearchButton">SEARCH</button>
    </form>
  );
};
