import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const axiosUser = axios.create({
  baseURL: 'https://wallet.goit.ua/',
});

const token = {
  set(token) {
    console.log('token :>> ', token);
    axiosUser.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axiosUser.defaults.headers.common.Authorization = '';
  },
};

export const registerUser = createAsyncThunk(
  'api/auth/sign-up',
  async (body, thunkAPI) => {
    try {
      console.log('body :>> ', body);
      const { data } = await axiosUser.post('api/auth/sign-up', body);
      console.log('token :>> ', token);
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.status);
    }
  }
);

export const loginUser = createAsyncThunk(
  'api/auth/sign-in',
  async (body, thunkAPI) => {
    try {
      const res = await axiosUser.post('api/auth/sign-in', body);
      token.set(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
