import axios from 'axios';
import { token } from './privateAPI';
import { toast } from 'react-toastify';

const publicAPI = axios.create({
  baseURL: 'https://wallet.goit.ua/',
});

export const login = async body => {
  try {
    const { data } = await publicAPI.post('api/auth/sign-in', body);
    token.set(data.token);
    return data;
  } catch (error) {
    toast.error('Login or password is incorrect');
    throw error;
  }
};

export const register = async body => {
  try {
    const { data } = await publicAPI.post('api/auth/sign-up', body);
    token.set(data.token);
    return data;
  } catch (error) {
    if (error.response.status === 409) {
      toast.error('User with such email already exists. Please log in');
    } else if (error.response.status === 400) {
      toast.error('Validation error');
    }
    throw error;
  }
};
