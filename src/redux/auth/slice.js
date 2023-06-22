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
// const handleSetToken = (state, { payload }) => {
//   state.token = payload.token;
// };
const handleRegisterFulfilled = (state, { payload }) => {
  state.isLoggedIn = true;
  state.isLoading = false;
  state.user = payload.user;
};
const handleLoginRejected = (state, { error }) => {
  state.isLoading = false;
  state.error = error.message;
  console.log('slise console', error);
};
const handleLogout = state => {
  state.isLoading = false;
  state.isLoggedIn = false;
  state.token = null;
};
// const clearUser = state => {
//   state.user = initialState.user;
// };

const authSlise = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, handleRegisterFulfilled)
      // .addCase(registerUser.fulfilled, handleSetToken)
      .addCase(registerUser.rejected, handleLoginRejected)
      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, handleRegisterFulfilled)
      // .addCase(loginUser.fulfilled, handleSetToken)
      .addCase(loginUser.rejected, handleLoginRejected)
      .addCase(refreshUser.pending, handlePending)
      .addCase(refreshUser.fulfilled, handleRegisterFulfilled)
      .addCase(refreshUser.rejected, handleLoginRejected)
      // .addCase(refreshUser.rejected, clearUser)
      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, handleLogout)
      // .addCase(logoutUser.fulfilled, clearUser)
      .addCase(logoutUser.rejected, handleLogout);
  },
});

export const authReducer = authSlise.reducer;
