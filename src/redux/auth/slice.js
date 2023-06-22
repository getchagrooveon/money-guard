import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, refreshUser, registerUser } from './operations';

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    balance: 0,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.error = null;
  state.isLoading = true;
};
const handleRefreshFulfiled = (state, { payload }) => {
  state.isLoggedIn = true;
  state.isLoading = false;
  state.user = payload;
};
const handleRegisterFulfilled = (state, { payload }) => {
  state.isLoggedIn = true;
  state.isLoading = false;
  state.user = payload.user;
  state.token = payload.token;
};
const handleLoginRejected = (state, { error }) => {
  state.isLoading = false;
  state.error = error.message;
};
const handleLogout = state => {
  state.isLoading = false;
  state.isLoggedIn = false;
  state.token = null;
  state.user = initialState.user;
};

const authSlise = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleRegisterFulfilled)
      .addCase(registerUser.rejected, handleLoginRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleRegisterFulfilled)
      .addCase(loginUser.rejected, handleLoginRejected)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, handleRefreshFulfiled)
      .addCase(refreshUser.rejected, handleLoginRejected)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, handleLogout)
      .addCase(logoutUser.rejected, handleLogout);
  },
});

export const authReducer = authSlise.reducer;
