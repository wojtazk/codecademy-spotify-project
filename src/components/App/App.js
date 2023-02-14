import { useState } from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

function App() {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'song 1', artist: 'artist 1', album: 'album 1' },
    {
      id: 2,
      name: 'High Ground',
      artist: 'Obi-wan Kenobi',
      album: "It's over Anakin",
    },
  ]);

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={setSearchResults} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
