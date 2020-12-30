import React from 'react';
import { ReactComponent as SunSVG } from '../images/sun.svg';
// import { ReactComponent as GardeningGrassSVG } from '../images/gardening-grass.svg';
import { ReactComponent as CloudSVG } from '../images/cloud.svg';
// import { ReactComponent as TreeSVG } from '../images/tree.svg';

import './Background.css';

function Background() {
  return (
    <>
      <SunSVG className="sun-svg" />
      {/* <GardeningGrassSVG
        className="gardening-grass-svg"
        style={{ bottom: '80px', left: '10%' }}
      /> */}
      <CloudSVG className="cloud-svg" style={{ top: '120px', left: '150px' }} />
      <CloudSVG className="cloud-svg" style={{ top: '80px', right: '250px' }} />
      {/* <TreeSVG className="tree-svg" style={{ bottom: '80px', right: '15%' }} /> */}
    </>
  );
}

export default Background;
