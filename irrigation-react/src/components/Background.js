import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as SunSVG } from '../assets/sun.svg';
import { ReactComponent as CloudSVG } from '../assets/cloud.svg';

import './Background.css';

function Background() {
  const isMobile = useMediaQuery({
    query: '(max-width: 720px)',
  });
  return (
    <>
      <SunSVG
        className="sun-svg"
        style={{
          top: '40px',
          right: '8%',
          height: isMobile ? '80px' : '100px',
        }}
      />
      {!isMobile && (
        <>
          <CloudSVG
            className="cloud-svg"
            style={{ top: '120px', left: '10%', height: '90px' }}
          />
          <CloudSVG
            className="cloud-svg"
            style={{ top: '80px', right: '12%', height: '100px' }}
          />
        </>
      )}
      <CloudSVG
        className="cloud-svg"
        style={{
          top: isMobile ? '140px' : '220px',
          right: isMobile ? '8%' : '23%',
          height: '65px',
          zIndex: -3,
        }}
      />
      <CloudSVG
        className="cloud-svg mirror"
        style={{
          top: '30px',
          left: isMobile ? '20%' : '28%',
          height: '70px',
          zIndex: -3,
        }}
      />
      <CloudSVG
        className="cloud-svg mirror"
        style={{ top: '320px', left: '53%', height: '40px' }}
      />
    </>
  );
}

export default Background;
