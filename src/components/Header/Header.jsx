import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import { IconExit } from '../Icons/IconExit';
import { LogoSVG } from '../Icons/LogoSVG';
import css from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'redux/auth/operations';

export const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth.user.username);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={css.header}>
      <div className="container">
        <NavLink to="/" className={css.logo}>
          <LogoSVG className={css.logoSvg} />
          <span className={css.logoText}>Money Guard</span>
        </NavLink>
        <div className={css.headerLeft}>
          <p className={css.name}>{userName}</p>
          <div className={css.verticalLine}></div>
          <button
            type="button"
            className={css.btnLogOut}
            onClick={handleLogOut}
          >
            <IconExit className={css.iconExit} />
            <p className={css.hiddenExit}>Exit</p>
          </button>
        </div>
      </div>
    </header>
  );
};
