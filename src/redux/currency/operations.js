import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrencyRates } from 'services/currencyAPI';

export const getCurrencyThunk = createAsyncThunk(
  'currency/get',
  getCurrencyRates
);
