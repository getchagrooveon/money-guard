import React from 'react';
import css from './Balance.module.css';

export const Balance = () => {
  return (
    <div className={css.balanceBox}>
      <p className={css.balanceTitle}>Your balance</p>
      <p className={css.balance}>A lot of USD</p>
    </div>
  );
};
