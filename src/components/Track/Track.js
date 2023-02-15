import React from 'react';
import './Track.css';

export const Track = ({ track, isRemoval, onAdd, onRemove }) => {
  const addTrack = () => {
    onAdd(track);
  };

  const removeTrack = () => {
    onRemove(track);
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{`${track.artist} | ${track.album}`}</p>
      </div>
      <button
        className="Track-action"
        onClick={isRemoval ? removeTrack : addTrack}
      >
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  );
};
