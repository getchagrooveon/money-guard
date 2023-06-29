import axios from 'axios';
import { toast } from 'react-toastify';
import { refreshUser } from 'redux/auth/operations';
import { selectToken } from 'redux/auth/selectors';
import {
  closeAddModal,
  closeEditModal,
  closeLogoutModal,
} from 'redux/global/slice';

const privateAPI = axios.create({
  baseURL: 'https://wallet.goit.ua/',
});

export const token = {
  set(token) {
    privateAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    privateAPI.defaults.headers.common.Authorization = '';
  },
};

export const refresh = async body => {
  try {
    token.set(body);
    const { data } = await privateAPI.get('api/users/current', body);
    return data;
  } catch (error) {
    token.unset();
    throw error;
  }
};

export const logout = async (_, { dispatch }) => {
  try {
    const { data } = await privateAPI.delete('api/auth/sign-out');
    dispatch(closeLogoutModal());
    token.unset();
    return data;
  } catch (error) {
    dispatch(closeLogoutModal());
    token.unset();
    throw error;
  }
};

export const getTransactions = async () => {
  const { data } = await privateAPI.get('api/transactions');
  return data;
};

export const addTransaction = async (body, { dispatch }) => {
  try {
    const { data } = await privateAPI.post('api/transactions', body);
    toast.success('Transaction added');
    dispatch(closeAddModal());
    return data;
  } catch (error) {
    error.response.data?.message.map(e => toast.error(e));
    throw error;
  }
};

export const removeTransaction = async (id, { dispatch, getState }) => {
  const token = selectToken(getState());
  dispatch(refreshUser(token));
  await privateAPI.delete(`api/transactions/${id}`);
  toast.success('Transaction removed');
  return id;
};

export const editTransaction = async (
  { id, transactionDate, type, categoryId, comment, amount },
  { dispatch }
) => {
  try {
    const body = { transactionDate, type, categoryId, comment, amount };
    const { data } = await privateAPI.patch(`api/transactions/${id}`, body);
    toast.success('Transaction changed');
    dispatch(closeEditModal());
    return data;
  } catch (error) {
    error.response.data?.message.map(e => toast.error(e));
    throw error;
  }
};

export const getCategories = async () => {
  const { data } = await privateAPI.get('api/transaction-categories');
  return data;
};

export const getSummary = async params => {
  const { data } = await privateAPI.get('api/transactions-summary', { params });
  return data;
};
