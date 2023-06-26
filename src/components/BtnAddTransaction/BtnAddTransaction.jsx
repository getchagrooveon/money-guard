import { AddTransaction } from 'components/AddTransation/AddTransaction';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowAddModal } from 'redux/global/selectors';
import { closeAddModal, showAddModal } from 'redux/global/slice';
import css from './BtnAddTransaction.module.css';

const svgPlus = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 0V20" stroke="white" strokeWidth="2" />
    <path d="M0 10L20 10" stroke="white" strokeWidth="2" />
  </svg>
);

export const BtnAddTransaction = () => {
  const isAddTransaction = useSelector(selectShowAddModal);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAddModal());
  };

  const handelClick = () => {
    dispatch(showAddModal());
  };

  return (
    <>
      <button
        type="button"
        onClick={handelClick}
        className={css.btnAdd}
        style={{ borderRadius: '50%' }}
      >
        {svgPlus}
      </button>
      {isAddTransaction && <AddTransaction closeModal={closeModal} />}
    </>
  );
};
