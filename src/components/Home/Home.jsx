import React from 'react';
import Statistics from '../../pages/Statistics/Statistics';
import Transactions from '../../pages/Transactions/Transactions';
import { Navigation } from 'components/Navigation/Navigation';
import { Balance } from 'components/Balance/Balance';
import css from './Home.module.css';
import EditTransactions from 'components/EditTransactions/EditTransactions';
import { useSelector } from 'react-redux';
import { selectTransaction } from 'redux/global/selectors';

const Home = () => {
  const editModalShow = useSelector(selectTransaction) ? true : false;
  return (
    <div className={css.homeTab}>
      <div className="container">
        <Navigation />
        <Balance />
        <Transactions />
        {editModalShow && <EditTransactions />}
        <Statistics />
      </div>
    </div>
  );
};

export default Home;
