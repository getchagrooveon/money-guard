import React from 'react';
import Statistics from 'components/Statistics/Statistics';
import Transactions from 'components/Transactions/Transactions';
import { Navigation } from 'components/Navigation/Navigation';
import { Balance } from 'components/Balance/Balance';
import css from './Home.module.css';
import EditTransactions from 'components/EditTransactions/EditTransactions';

const Home = () => {
  return (
    <div className={css.homeTab}>
      <div className="container">
        <Navigation />
        <Balance />
        <Transactions />
        <EditTransactions />
        <Statistics />
      </div>
    </div>
  );
};

export default Home;
