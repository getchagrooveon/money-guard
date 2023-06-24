import { AddTransaction } from 'components/AddTransation/AddTransaction';
import React, { useState } from 'react';

export const BtnAddTransaction = () => {
  const [modal, setModal] = useState(false);

  const closeModal = bul => {
    setModal(bul);
  };

  const handelClick = () => {
    setModal(true);
  };

  return (
    <>
      <button type="button" onClick={handelClick}>
        AddTransaction
      </button>
      {modal && <AddTransaction closeModal={closeModal} />}
    </>
  );
};
