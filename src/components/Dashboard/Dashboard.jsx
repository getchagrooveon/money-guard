import Home from 'components/Home/Home';
import React from 'react';
import Currency from 'components/Currency/Currency';
import Header from 'components/Header/Header';

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <Home />
      <Currency />
    </div>
  );
};

export default Dashboard;
