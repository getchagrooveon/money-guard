import { createAsyncThunk } from '@reduxjs/toolkit';
import { logout, refresh } from 'services/privateAPI';
import { login, register } from 'services/publicAPI';

export const registerUser = createAsyncThunk('auth/sign-up', register);

export const loginUser = createAsyncThunk('auth/sign-in', login);

export const refreshUser = createAsyncThunk('auth/refresh', refresh);

export const logoutUser = createAsyncThunk('auth/logout', logout);
