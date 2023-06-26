import { AddTransaction } from 'components/AddTransation/AddTransaction';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectShowAddModal } from 'redux/global/selectors';
import { closeAddModal, showAddModal } from 'redux/global/slice';

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
      <button type="button" onClick={handelClick}>
        AddTransaction
      </button>
      {isAddTransaction && <AddTransaction closeModal={closeModal} />}
    </>
  );
};
