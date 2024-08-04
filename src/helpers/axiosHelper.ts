import axios, { AxiosInstance } from 'axios';

import { BASEAPI } from '../config/baseURL';

import { authActions } from '../redux/actions/combineAction';
import store from '../redux/store';
import toast from '../services/toast';

const token = store && store?.getState()?.auth?.token;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASEAPI,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'app-id': 3,
    'client-id': 101212
    // token: token,
  }
});

axiosInstance?.interceptors?.response?.use(
  response => {
    return response;
  },
  error => {
    if (error?.response?.status === 401) {
      toast.danger({
        message:
          error?.response?.data?.errors[0].message ??
          'token Expired Please login Again'
      });

      store?.dispatch(authActions?.logout());
    } else {
      console.log(error?.response?.status, 'erorr status from api');
      return error?.response?.status;
    }
    console.log(error, 'error from api');
    return error?.response?.status;
    // throw error;
  }
);
export const setToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = token;
};
