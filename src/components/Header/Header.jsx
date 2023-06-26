import React from 'react';
import { NavLink } from 'react-router-dom/dist';
import { IconExit } from '../Icons/IconExit';
import { LogoSVG } from '../Icons/LogoSVG';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from 'redux/auth/operations';
import { ModalLogOut } from 'components/ModalLogOut/ModalLogOut';
import { selectShowLogout } from 'redux/global/selectors';
import { closeLogoutModal, showLogoutModal } from 'redux/global/slice';
import css from './Header.module.css';

export const Header = () => {
  const isOpenLogout = useSelector(selectShowLogout);
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth.user.username);

  const handleLogOut = () => {
    dispatch(logoutUser());
  };

  const openModal = () => {
    dispatch(showLogoutModal());
  };

  const closeModal = () => {
    dispatch(closeLogoutModal());
  };

  return (
    <>
      <header className={css.header}>
        <div className="container">
          <NavLink to="/" className={css.logo}>
            <LogoSVG className={css.logoSvg} />
            <span className={css.logoText}>Money Guard</span>
          </NavLink>
          <div className={css.headerLeft}>
            <p className={css.name}>{userName}</p>
            <div className={css.verticalLine}></div>
            <button type="button" className={css.btnLogOut} onClick={openModal}>
              <IconExit className={css.iconExit} />
              <p className={css.hiddenExit}>Exit</p>
            </button>
          </div>
        </div>
      </header>
      {isOpenLogout && (
        <ModalLogOut closeModal={closeModal} logout={handleLogOut} />
      )}
    </>
  );
};
