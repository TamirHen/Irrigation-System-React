import React from 'react';
import { ReactComponent as SunSVG } from '../images/sun.svg';
import { ReactComponent as CloudSVG } from '../images/cloud.svg';

// import Birds from '../model/Birds';
import './Background.css';

function Background() {
  return (
    <>
      {/* <Birds /> */}
      <SunSVG
        className="sun-svg"
        style={{ top: '40px', right: '8%', height: '100px' }}
      />
      <CloudSVG
        className="cloud-svg mirror"
        style={{ top: '30px', left: '28%', height: '70px', zIndex: -3 }}
      />
      <CloudSVG
        className="cloud-svg"
        style={{ top: '120px', left: '10%', height: '90px' }}
      />
      <CloudSVG
        className="cloud-svg"
        style={{ top: '80px', right: '12%', height: '100px' }}
      />
      <CloudSVG
        className="cloud-svg"
        style={{ top: '220px', right: '23%', height: '65px', zIndex: -3 }}
      />
      <CloudSVG
        className="cloud-svg mirror"
        style={{ top: '320px', left: '53%', height: '40px' }}
      />
    </>
  );
}

export default Background;
