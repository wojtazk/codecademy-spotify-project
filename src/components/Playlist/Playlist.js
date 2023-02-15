import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export const Playlist = ({ name, onNameChange, tracks, onRemove, onSave }) => {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
    console.log(name);
  };

  return (
    <div className="Playlist">
      <input
        defaultValue={name || 'New Playlist'}
        onChange={handleNameChange}
      />
      <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};
