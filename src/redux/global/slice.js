import { createSlice } from '@reduxjs/toolkit';

const global = createSlice({
  name: 'global',
  initialState: {
    editTransaction: null,
    isAddModalShow: false,
    isLogoutModalShow: false,
  },
  reducers: {
    setUpdatedTransaction: (state, { payload }) => {
      state.editTransaction = payload;
    },
    closeEditModal: state => {
      state.editTransaction = null;
    },
    showAddModal: state => {
      state.isAddModalShow = true;
    },
    showLogoutModal: state => {
      state.isLogoutModalShow = true;
    },
    closeAddModal: state => {
      state.isAddModalShow = false;
    },
    closeLogoutModal: state => {
      state.isLogoutModalShow = false;
    },
  },
});
export const globalReducer = global.reducer;
export const {
  setUpdatedTransaction,
  closeEditModal,
  showAddModal,
  showLogoutModal,
  closeAddModal,
  closeLogoutModal,
} = global.actions;
