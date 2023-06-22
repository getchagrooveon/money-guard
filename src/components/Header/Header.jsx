import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={css.header}>
      <NavLink to="/home" className={css.Logo}>
        Money Guard
      </NavLink>
      <div className={css.headerLeft}>
        <p className={css.name}>Name</p>
        <p className={css.hiddenExit}>Exit</p>
      </div>
    </header>
  );
};

export default Header;
