import React from 'react';
import Transactions from '../../pages/Transactions/Transactions';
import css from './Home.module.css';
import EditTransactions from 'components/EditTransactions/EditTransactions';
import { useMediaQuery } from 'react-responsive';
import { Balance } from 'components/Balance/Balance';
import { useSelector } from 'react-redux';
import { selectTransaction } from 'redux/global/selectors';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isModalEditShow = useSelector(selectTransaction) ? true : false;
  return (
    <div className={css.homeTab}>
      <div className="container">
        {isMobile && <Balance />}
        <Transactions />
        {isModalEditShow && <EditTransactions />}
      </div>
    </div>
  );
};

export default Home;
