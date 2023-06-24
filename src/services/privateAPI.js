import axios from 'axios';

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

export const logout = async () => {
  try {
    const { data } = await privateAPI.delete('api/auth/sign-out');
    token.unset();
    return data;
  } catch (error) {
    token.unset();
    throw error;
  }
};

export const getTransactions = async () => {
  const { data } = await privateAPI.get('api/transactions');
  return data;
};

export const addTransaction = async body => {
  const { data } = await privateAPI.post('api/transactions', body);
  return data;
};

export const removeTransaction = async id => {
  await privateAPI.delete(`api/transactions/${id}`);
  return id;
};

export const editTransaction = async ({
  id,
  transactionDate,
  type,
  categoryId,
  comment,
  amount,
}) => {
  const body = { transactionDate, type, categoryId, comment, amount };
  const { data } = await privateAPI.patch(`api/transactions/${id}`, body);
  return data;
};

export const getCategories = async () => {
  const { data } = await privateAPI.get('api/transaction-categories');
  return data;
};

export const getSummary = async params => {
  const { data } = await privateAPI.get('api/transactions-summary', { params });
  return data;
};