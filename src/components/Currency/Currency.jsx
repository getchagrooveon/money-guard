import React from 'react';
import css from './Currency.module.css';

const Currency = () => {
  return (
    <div className="container currency">
      <div className={css.currencyheader}>
        <span>Currency</span>
        <span>Purchase</span>
        <span>Sale</span>
      </div>
      <span>USD</span>
      <span>!</span>
      <span>!</span>
      <span>EUR</span>
      <span>!</span>
      <span>!</span>
    </div>
  );
};

export default Currency;
