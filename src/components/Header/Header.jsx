import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import { IconExit } from '../Icons/IconExit';
import { LogoSVG } from '../Icons/LogoSVG';
import css from './Header.module.css';

export const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <NavLink to="/" className={css.logo}>
          <LogoSVG className={css.logoSvg} />
          <span className={css.logoText}>Money Guard</span>
        </NavLink>
        <div className={css.headerLeft}>
          <p className={css.name}>Name</p>
          <div className={css.verticalLine}></div>
          <button type="button" className={css.btnLogOut}>
            <IconExit className={css.iconExit} />
            <p className={css.hiddenExit}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  );
};
