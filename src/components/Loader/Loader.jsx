import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#9E40BA"
        innerCircleColor=" #FFC727"
        middleCircleColor="#7000FF"
      />
    </div>
  );
};

export default Loader;
