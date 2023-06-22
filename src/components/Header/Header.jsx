import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <NavLink to="/" className={css.logo}>
          <img src=".../images/logo/logo.png" alt="" />
          {/* <svg width={18} height={18}>
            <use href="../images/logo.png/logo.png"></use>
          </svg> */}
          <span>Money Guard</span>
        </NavLink>
        <div className={css.headerLeft}>
          <p className={css.name}>Name</p>
          <div className={css.verticalLine}></div>
          <p className={css.hiddenExit}>Exit</p>
        </div>
      </div>
    </header>
  );
};
