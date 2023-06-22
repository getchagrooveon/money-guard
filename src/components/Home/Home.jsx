import React from 'react';
import Statistics from 'components/Statistics/Statistics';
import Balance from 'components/Balance/Balance';
import Transactions from 'components/Transactions/Transactions';

export const Home = () => {
  return (
    <div>
      <Statistics />
      <Balance />
      <Transactions />
    </div>
  );
};

export default Home;
