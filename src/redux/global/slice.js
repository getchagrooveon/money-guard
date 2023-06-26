import { createSlice } from '@reduxjs/toolkit';

const global = createSlice({
  name: 'global',
  initialState: { editTransaction: null },
  reducers: {
    setUpdatedTransaction: (state, { payload }) => {
      state.editTransaction = payload;
    },
    hideEditModal: state => {
      state.editTransaction = null;
    },
  },
});
export const globalReducer = global.reducer;
export const { setUpdatedTransaction, hideEditModal } = global.actions;
