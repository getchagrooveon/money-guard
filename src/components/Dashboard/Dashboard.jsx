import Home from 'components/Home/Home';
import React from 'react';
import Currency from 'components/Currency/Currency';
import { Header } from 'components/Header/Header';
import css from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={css.dashboard}>
      <Header />
      <Home />
      <Currency />
    </div>
  );
};

export default Dashboard;
