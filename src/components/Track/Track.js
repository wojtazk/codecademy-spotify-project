import React from 'react';
import './Track.css';

export const Track = (props) => {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{'<!-- track name will go here -->'}</h3>
        <p>
          {
            '<!-- track artist will go here--> | <!-- track album will go here -->'
          }
        </p>
      </div>
      <button className="Track-action">{props.isRemoval ? '-' : '+'}</button>
    </div>
  );
};
