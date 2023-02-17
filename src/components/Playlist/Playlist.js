import React, { useRef } from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export const Playlist = ({ name, onNameChange, tracks, onRemove, onSave }) => {
  const inputRef = useRef();

  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="Playlist">
      <input
        ref={inputRef}
        defaultValue={name}
        onChange={handleNameChange}
        onFocus={() => inputRef.current.select()}
      />
      <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};
