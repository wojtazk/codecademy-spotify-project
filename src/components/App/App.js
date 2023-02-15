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

  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      id: 12,
      uri: '12',
      name: 'Playlist track 1',
      artist: 'artist 1',
      album: 'album 1',
    },
    {
      id: 24,
      uri: '123456',
      name: 'High Ground - Playlist track 2',
      artist: 'Obi-wan Kenobi',
      album: "It's over Anakin",
    },
  ]);

  const addTrack = (track) => {
    const isNew = !playlistTracks.some((tr) => tr.id === track.id);

    if (isNew) setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks((oldTracks) =>
      oldTracks.filter((tr) => tr.id !== track.id)
    );
  };

  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);

    // TODO: pass playlist name and track to spotify linked method
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            name={playlistName}
            onNameChange={updatePlaylistName}
            tracks={playlistTracks}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
