import React from 'react';
import css from './Dashboard.module.css';
import { Layout } from 'components/Layout/Layout';

const Dashboard = () => {
  return (
    <div className={css.dashboard}>
      <Layout />
    </div>
  );
};

export default Dashboard;
