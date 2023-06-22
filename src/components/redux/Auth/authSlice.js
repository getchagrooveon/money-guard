import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './operations';

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    balance: 0,
  },
  token: null,
  isLoggedIn: false,
  isRefresher: false,
};
const fetchStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Error: 'error',
};

const authSlise = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        console.log('state1 :>> ', state);
        state.status = fetchStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        console.log('payload :>> ', payload);
        console.log('state 2:>> ', state);
        state.status = fetchStatus.Success;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, state => {
        console.log('state3:>> ', state);
        state.status = fetchStatus.Error;
      })
      .addCase(loginUser.pending, state => {
        state.status = fetchStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = fetchStatus.Success;
        state.user = payload.user;
        state.token = payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, state => {
        state.status = fetchStatus.Error;
      });
  },
});

export const authReducer = authSlise.reducer;
