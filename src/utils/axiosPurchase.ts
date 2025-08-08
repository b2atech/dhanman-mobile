import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from './logger';

const axiosPurchaseServices = axios.create({
  baseURL: 'https://qa.purchase.dhanman.com/api/',
  timeout: 10000,
});

const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      Logger.debug('Token retrieved successfully:', token);
      return token;
    } else {
      Logger.error('No access token found in AsyncStorage');
      return null;
    }
  } catch (error) {
    Logger.error('Error retrieving access token:', error);
    return null;
  }
};

axiosPurchaseServices.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      Logger.debug('Adding token to request headers:', token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Logger.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosPurchaseServices.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Logger.warn('axiosPurchaseServices unauthorized', { status: error.response.status });
    }
    const errorMessage =
      typeof error?.response?.data === 'string'
        ? error.response.data
        : 'Wrong Services';
    const errorObject = new Error(errorMessage);
    return Promise.reject(errorObject);
  }
);

export default axiosPurchaseServices;

interface FetcherConfig extends AxiosRequestConfig {
  data?: any;
}

export const fetcher = async (url: string, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();

    if (token) {
      config.headers = {
        ...config.headers,
        'x-organization-id': '37437e17-c0e2-4e97-8167-121b854fe90b',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }

    Logger.debug('Request config:', {
      url,
      method: 'GET',
      headers: config.headers,
      baseURL: axiosPurchaseServices.defaults.baseURL,
    });

    const res = await axiosPurchaseServices.get(url, { ...config });
    Logger.debug('Response received:', res);
    return res.data;
  } catch (error: any) {
    Logger.error('Fetcher Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      authorization: error.Authorization,
      error: error.error,
      errorMessage: error.errorMessage,
    });
    throw error;
  }
};

export const fetcherPost = async (url: string, data: any = {}, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    const res = await axiosPurchaseServices.post(url, data, config);
    return res.data;
  } catch (error) {
    Logger.error('Fetcher Post Error:', error);
    throw error;
  }
};

export const fetcherPut = async (url: string, data: any = {}, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    const res = await axiosPurchaseServices.put(url, data, config);
    return res.data;
  } catch (error) {
    Logger.error('Fetcher Put Error:', error);
    throw error;
  }
};
