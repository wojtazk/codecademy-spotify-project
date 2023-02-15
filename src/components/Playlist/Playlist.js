import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export const Playlist = ({ name, tracks, onRemove }) => {
  return (
    <div className="Playlist">
      <input defaultValue={name || 'New Playlist'} />
      <TrackList tracks={tracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};
