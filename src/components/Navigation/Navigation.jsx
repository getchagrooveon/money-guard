import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import css from './Navigation.module.css';
import { IconHome } from 'components/Icons/IconHome';
import { StatisticsIcon } from 'components/Icons/StatisticsIcon';
import { IconCurrency } from 'components/Icons/IconCurrency';

export const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <NavLink to="/home" className={css.navLink}>
            <IconHome className={css.navIcon} />
            <span className={css.navText}>Home</span>
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink to="/statistics" className={css.navLink}>
            <StatisticsIcon className={css.navIcon} />
            <span className={css.navText}>Statistics</span>
          </NavLink>
        </li>
        <li className={css.hiddenItem}>
          <NavLink to="/currency" className={css.navLink}>
            <IconCurrency className={css.navIcon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
