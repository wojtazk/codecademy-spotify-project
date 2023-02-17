import { useEffect, useState } from 'react';

import './App.css';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

import { Spotify } from '../../util/Spotify';

function App() {
  useEffect(() => {
    Spotify.getAccessToken();

    const reload = () => window.location.reload();
    window.addEventListener('hashchange', reload);

    return window.removeEventListener('hashchange', reload);
  }, []);
  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      name: 'song 1',
      artist: 'artist 1',
      album: 'album 1',
      uri: 'spotify:track:2DxaLqCKfChhN9xUhN8R0A',
    },
    {
      id: 2,
      name: 'High Ground',
      artist: 'Obi-wan Kenobi',
      album: "It's over Anakin",
      uri: 'spotify:track:5eNnuKhQMh9jieIYzWutgR',
    },
  ]);

  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    const isNew = !playlistTracks.some((tr) => tr.id === track.id);

    if (isNew) setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((tr) => tr.id !== track.id)
    );
  };

  const updatePlaylistName = (newName) => {
    setPlaylistName(newName);
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);

    Spotify.savePLaylist(playlistName, trackURIs);
  };

  const search = (term) => {
    if (!term) return;

    console.log('search query: ', term);

    Spotify.search(term).then((tracks) => {
      console.log('search results: ', tracks);
      setSearchResults(tracks);
    });
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
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
