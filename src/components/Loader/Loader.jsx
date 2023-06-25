import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.backdrop}>
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
        className={css.loader}
      />
    </div>
  );
};

export default Loader;
