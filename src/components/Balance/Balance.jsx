import React from 'react';
import css from './Balance.module.css';
import { useSelector } from 'react-redux';
import { formatMoney } from 'utils/formatMoney';

export const Balance = () => {
  const balance = useSelector(state => state.auth.user.balance);

  return (
    <>
      <div className={css.balanceBox}>
        <p className={css.balanceTitle}>Your balance</p>
        <p className={css.balance}>
          <span className={css.uah}>&#8372;</span> {formatMoney(balance)}
        </p>
      </div>
    </>
  );
};
