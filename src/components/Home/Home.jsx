import React from 'react';
import Statistics from 'components/Statistics/Statistics';
import Transactions from 'components/Transactions/Transactions';
import { Navigation } from 'components/Navigation/Navigation';
import { Balance } from 'components/Balance/Balance';
import css from './Home.module.css';

export const Home = () => {
  return (
    <div className={css.homeTab}>
      <Navigation />
      <Balance />

      <Statistics />

      <Transactions />
    </div>
  );
};

export default Home;
