import React from 'react';
import css from './ModalLogOut.module.css';

export const ModalLogOut = ({ onClick }) => {
  //   const handleOverlayClick = e => {
  // if (e.target === e.currentTarget) {
  //   closeModal('');
  // }}
  return (
    <div className={css.overlayLogout}>
      <div className={css.modalLogout}>
        <p>Are you sure you want to log out?</p>
        <button type="button">Log out</button>
        <button type="button">Return home</button>
      </div>
    </div>
  );
};
