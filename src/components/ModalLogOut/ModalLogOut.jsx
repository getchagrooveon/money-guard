import React from 'react';
import { useEffect } from 'react';
import css from './ModalLogOut.module.css';

export const ModalLogOut = ({ closeModal, logout }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal('');
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        closeModal('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.overlayLogout} onClick={handleOverlayClick}>
      <div className={css.modalLogout}>
        <p className={css.logoutAlert}>Are you sure you want to log out?</p>
        <button type="button" onClick={logout} className={css.btnModalLogout}>
          Log out
        </button>
        <button
          type="button"
          onClick={closeModal}
          className={css.btnCancelLogout}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
