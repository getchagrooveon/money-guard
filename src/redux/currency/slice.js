import { createSlice } from '@reduxjs/toolkit';
import { getCurrencyThunk } from './operations';

const initialState = {
  USD: {},
  EUR: {},
  isLoading: false,
  error: null,
};

const handleRatesPending = state => {
  state.error = null;
  state.isLoading = true;
};
const handleRatesFulfilled = (state, { payload }) => {
  state.error = null;
  state.isLoading = false;
  state.USD = payload.find(element => element.currencyCodeA === 840);
  state.EUR = payload.find(element => element.currencyCodeA === 978);
};
const handleRatesRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getCurrencyThunk.pending, handleRatesPending)
      .addCase(getCurrencyThunk.fulfilled, handleRatesFulfilled)
      .addCase(getCurrencyThunk.rejected, handleRatesRejected);
  },
});

export const currencyReducer = currencySlice.reducer;
