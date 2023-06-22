import Home from 'components/Home/Home';
import React from 'react';
import Currency from 'components/Currency/Currency';
import Header from 'components/Header/Header';

export const Dashboard = () => {
  return (
    <body>
      <Header />
      <Home />
      <Currency />
    </body>
  );
};

export default Dashboard;
