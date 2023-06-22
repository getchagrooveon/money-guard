import { createSlice } from '@reduxjs/toolkit/dist';
import {
  addThunk,
  categoriesThunk,
  getAllThunk,
  removeThunk,
  summaryThunk,
  updateThunk,
} from './operation';

const initialState = {
  transactions: [],
  categories: [],
  categoriesSummary: [],
  incomeSummary: 0,
  expenseSummary: 0,
  periodTotal: 0,
  year: 0,
  month: 0,
  isLoading: false,
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  console.log('Error occurred:', payload);
};
const handleAllTransactions = (state, payload) => {
  state.transactions = payload;
  state.isLoading = false;
};
const handlePending = state => {
  state.isLoading = true;
};
const handleAdd = (state, payload) => {
  state.transactions.push(payload);
  state.isLoading = false;
};
const handleEdit = (state, payload) => {
  state.transactions.map(e => (e.id === payload.id ? payload : e));
  state.isLoading = false;
};
const handleDelete = (state, payload) => {
  state.isLoading = false;
  console.log(payload);
};
const handleCategories = (state, payload) => {
  state.categories = payload;
  state.isLoading = false;
};
const handleSummary = (state, payload) => {
  state.categoriesSummary = payload.summary;
  state.expenseSummary = payload.expenseSummary;
  state.incomeSummary = payload.incomeSummary;
  state.periodTotal = payload.periodTotal;
  state.year = payload.year;
  state.month = payload.month;
  state.isLoading = false;
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllThunk.pending, handlePending)
      .addCase(getAllThunk.fulfilled, handleAllTransactions)
      .addCase(getAllThunk.rejected, handleRejected)
      .addCase(updateThunk.pending, handlePending)
      .addCase(updateThunk.fulfilled, handleEdit)
      .addCase(updateThunk.rejected, handleRejected)
      .addCase(addThunk.pending, handlePending)
      .addCase(addThunk.fulfilled, handleAdd)
      .addCase(addThunk.rejected, handleRejected)
      .addCase(removeThunk.pending, handlePending)
      .addCase(removeThunk.fulfilled, handleDelete)
      .addCase(removeThunk.rejected, handleRejected)
      .addCase(categoriesThunk.pending, handlePending)
      .addCase(categoriesThunk.fulfilled, handleCategories)
      .addCase(categoriesThunk.rejected, handleRejected)
      .addCase(summaryThunk.pending, handlePending)
      .addCase(summaryThunk.fulfilled, handleSummary)
      .addCase(summaryThunk.rejected, handleRejected);
  },
});

export const transactionsReducer = transactionSlice.reducer;
