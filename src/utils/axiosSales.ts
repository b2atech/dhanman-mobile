import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logger from './logger';

const axiosSalesServices = axios.create({
  baseURL: 'https://qa.sales.dhanman.com/api/',
  timeout: 10000, // 10 seconds timeout
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      return token;
    } else {
      Logger.error('No access token found');
      return null;
    }
  } catch (error) {
    Logger.error('Error retrieving access token:', error);
    return null;
  }
};

axiosSalesServices.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (
      error.response &&
      error.response.status === 401
    ) {
      Logger.warn('axiosSalesServices unauthorized', { status: error.response.status });
    }
    const errorMessage =
      typeof error?.response?.data === 'string'
        ? error.response.data
        : 'Wrong Services';
    const errorObject = new Error(errorMessage);
    return Promise.reject(errorObject);
  },
);

export default axiosSalesServices;

interface FetcherConfig extends AxiosRequestConfig {
  data?: any;
}

export const fetcher = async (url: string, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    Logger.debug('Making request to:', url);
    Logger.debug('Token available:', !!token);

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }

    Logger.debug('Request config:', {
      url,
      method: 'GET',
      headers: config.headers,
      baseURL: axiosSalesServices.defaults.baseURL,
    });

    const res = await axiosSalesServices.get(url, {...config});
    Logger.debug('Response received:', { status: res.status, statusText: res.statusText });
    return res.data;
  } catch (error: any) {
    Logger.error('Fetcher Error Details:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });
    throw error;
  }
};

export const fetcherPost = async (url: string, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    const res = await axiosSalesServices.post(url, config.data, config);
    return res.data;
  } catch (error) {
    Logger.error('Fetcher Post Error:', error);
    throw error;
  }
};

export const fetcherPut = async (args: string | [string, FetcherConfig?]): Promise<any> => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosSalesServices.put(url, {...config?.data});

  return res.data;
};
