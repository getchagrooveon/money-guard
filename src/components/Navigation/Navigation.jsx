import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import css from './Navigation.module.css';
import { IconHome } from 'components/Icons/IconHome';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li className={css.navItem}>
          <NavLink to="/" className={css.navLink}>
            <IconHome className={css.iconHome} />
            <span>Home</span>
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/statistics" className={css.navLink}>
            <span>Statistics</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
