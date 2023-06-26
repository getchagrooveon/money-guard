import { Balance } from 'components/Balance/Balance';
import Currency from 'components/Currency/Currency';
import { Header } from 'components/Header/Header';
import { Navigation } from 'components/Navigation/Navigation';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router';
import css from './Layout.module.css';

export const Layout = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isDesktop = useMediaQuery({ query: '(min-width:1280px)' });
  return (
    <div className={css.layout}>
      <Header />
      {isMobile && (
        <>
          <div className="container">
            <Navigation />
          </div>
          <Outlet />
        </>
      )}

      {!isMobile && !isDesktop && (
        <>
          <div style={{ display: 'flex', gap: 32 }} className="container">
            <div>
              <Navigation />
              <Balance />
            </div>
            <Currency />
          </div>
          <Outlet />
        </>
      )}

      {isDesktop && (
        <>
          <div
            style={{ display: 'flex', gap: 32 }}
            className={css.containerNopadding}
          >
            <div className={css.desktopSidebar}>
              <div className={css.containerPadd}>
                <Navigation />
              </div>
              <Balance />
              <Currency />
            </div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};
