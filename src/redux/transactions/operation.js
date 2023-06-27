import { createAsyncThunk } from '@reduxjs/toolkit/dist';
import { refreshUser } from 'redux/auth/operations';
import { selectToken } from 'redux/auth/selectors';
import {
  addTransaction,
  editTransaction,
  getCategories,
  getSummary,
  getTransactions,
  removeTransaction,
} from 'services/privateAPI';

export const getAllThunk = createAsyncThunk(
  'transactions/getAll',
  getTransactions
);

export const updateThunk = createAsyncThunk(
  'transactions/update',
  editTransaction
);

export const removeThunk = createAsyncThunk(
  'transactions/remove',
  async (id, { rejectWithValue, dispatch, getState }) => {
    const token = selectToken(getState());
    try {
      const response = await removeTransaction(id);
      dispatch(refreshUser(token));
      return response;
    } catch {
      return rejectWithValue();
    }
  }
);

export const addThunk = createAsyncThunk('transactions/add', addTransaction);

export const categoriesThunk = createAsyncThunk(
  'transactions/categories',
  getCategories
);

export const summaryThunk = createAsyncThunk(
  'transactions/summary',
  getSummary
);
