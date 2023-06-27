import React from 'react';
import css from './Balance.module.css';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { formatMoney } from 'utils/formatMoney';

export const Balance = () => {
  const isDesktop = useMediaQuery({ query: '(min-width:1280px)' });

  const balance = useSelector(state => state.auth.user.balance);
  console.log(formatMoney(balance));

  return (
    <>
      {!isDesktop && (
        <div className={css.balanceBox}>
          <p className={css.balanceTitle}>Your balance</p>
          <p className={css.balance}>
            <span className={css.uah}>&#8372;</span> {formatMoney(balance)}
          </p>
        </div>
      )}
      {isDesktop && (
        <div className={css.balanceBox}>
          <p className={css.balanceTitle}>Your balance</p>
          <p className={css.balance}>
            <span className={css.uah}>&#8372;</span> {formatMoney(balance)}
          </p>
        </div>
      )}
    </>
  );
};
