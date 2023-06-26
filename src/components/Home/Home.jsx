import React from 'react';
import Transactions from '../../pages/Transactions/Transactions';
import css from './Home.module.css';
import { useMediaQuery } from 'react-responsive';
import { Balance } from 'components/Balance/Balance';
// import { useSelector } from 'react-redux';
// import { selectTransaction } from 'redux/global/selectors';
// import EditTransactions from 'components/EditTransactions/EditTransactions';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width:1280px)' });
  // const isModalEditShow = useSelector(selectTransaction) ? true : false;
  return (
    <div className={css.homeTab}>
      {isMobile && (
        <div className="container">
          <Balance />
          <Transactions />
        </div>
      )}

      {!isDesktop && !isMobile && (
        <div className="container">
          <Transactions />
        </div>
      )}

      {isDesktop && <Transactions />}
    </div>
  );
};

export default Home;
