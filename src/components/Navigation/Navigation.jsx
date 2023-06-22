import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import css from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li className={css.navItem}>
          <NavLink to="/home" className={css.navLink}>
            <span>Home</span>
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/statistics" className={css.navLink}>
            Statistics
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
