import React from 'react';

import './Birds.scss';

function Birds() {
  return (
    <div className="container">
      <h1>SVG Animated Birds</h1>

      <div className="bird-container bird-container--one">
        <div className="bird bird--one" />
      </div>

      <div className="bird-container bird-container--two">
        <div className="bird bird--two" />
      </div>

      <div className="bird-container bird-container--three">
        <div className="bird bird--three" />
      </div>

      <div className="bird-container bird-container--four">
        <div className="bird bird--four" />
      </div>
    </div>
  );
}

export default Birds;
