import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import css from './Header.module.css';
import { LogoSVG } from './LogoSVG';
import { IconExit } from './IconExit';

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
          <IconExit className={css.iconExit} />
          <p className={css.hiddenExit}>Exit</p>
        </div>
      </div>
    </header>
  );
};
