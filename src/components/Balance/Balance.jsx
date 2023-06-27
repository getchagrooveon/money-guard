import React from 'react';
import css from './Balance.module.css';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

export const Balance = () => {
  const isDesktop = useMediaQuery({ query: '(min-width:1280px)' });

  const balance = useSelector(state => state.auth.user.balance);

  return (
    <>
      {!isDesktop && (
        <div className={css.balanceBox}>
          <p className={css.balanceTitle}>Your balance</p>
          <p className={css.balance}>
            <span className={css.uah}>&#8372;</span> {balance.toFixed(2)}
          </p>
        </div>
      )}
      {isDesktop && (
        <div className={css.balanceBox}>
          <p className={css.balanceTitle}>Your balance</p>
          <p className={css.balance}>
            <span className={css.uah}>&#8372;</span> {balance.toFixed(2)}
          </p>
        </div>
      )}
    </>
  );
};
