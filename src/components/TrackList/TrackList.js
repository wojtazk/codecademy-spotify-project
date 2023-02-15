import React from 'react';
import './TrackList.css';
import { Track } from '../Track/Track';

export const TrackList = ({ tracks, isRemoval, onAdd, onRemove }) => {
  return (
    <div className="TrackList">
      {tracks?.map((track) => {
        return (
          <Track
            track={track}
            isRemoval={isRemoval}
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};
