import { createAsyncThunk } from '@reduxjs/toolkit/dist';
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
  removeTransaction
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
