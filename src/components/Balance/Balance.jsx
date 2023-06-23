import React from 'react';
import css from './Balance.module.css';
import { useSelector } from 'react-redux';

export const Balance = () => {
  const balance = useSelector(state => state.auth.user.balance);
  return (
    <div className={css.balanceBox}>
      <p className={css.balanceTitle}>Your balance</p>
      <p className={css.balance}>{balance}</p>
    </div>
  );
};
