import React from 'react';
import { Header } from 'components/Header/Header';
import css from './Dashboard.module.css';
import { Balance } from 'components/Balance/Balance';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Navigation } from 'components/Navigation/Navigation';
import Currency from 'components/Currency/Currency';

const Dashboard = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width:1280px)' });
  return (
    <>
      {isMobile && (
        <div className={css.dashboard}>
          <Header />
          <Navigation />
          <Outlet />
        </div>
      )}
      {isDesktop && (
        <div className={css.dashboard}>
          <Header />
          <main style={{ display: 'flex' }}>
            <div>
              <Navigation />
              <Balance />
              <Currency />
            </div>
            <Outlet />
          </main>
        </div>
      )}
      {!isDesktop && !isMobile && (
        <main style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <Navigation />
            <Balance />
            <Currency />
          </div>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default Dashboard;
