import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import Logger from './logger';
import { getTokenSecurely } from './secureStorage';

const ORGANIZATION_ID = 'acc867cb-af91-4746-862d-139682d5c3e3';

const axiosCommonServices = axios.create({
  baseURL: 'https://qa.common.dhanman.com/api/',
  timeout: 10000, // 10 seconds timeout
});

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await getTokenSecurely('userToken');
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

axiosCommonServices.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (
      error.response &&
      error.response.status === 401
      // !window.location.href.includes('/login')
    ) {
      Logger.warn('axiosCommunityServices unauthorized', { status: error.response.status });
      // window.location.pathname = '/maintenance/500';
    }
    const errorMessage =
      typeof error?.response?.data === 'string'
        ? error.response.data
        : 'Wrong Services';
    const errorObject = new Error(errorMessage);
    return Promise.reject(errorObject);
  },
);

export default axiosCommonServices;

interface FetcherConfig extends AxiosRequestConfig {
  data?: any;
}

export const fetcher = async (url: string, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    Logger.debug('Making request to:', url);
    Logger.debug('Token available:', !!token);

    config.headers = {
      ...config.headers,
      'x-organization-id': ORGANIZATION_ID,
      'Content-Type': 'application/json',
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    Logger.debug('Request config:', {
      url,
      method: 'GET',
      headers: config.headers,
      baseURL: axiosCommonServices.defaults.baseURL,
    });

    const res = await axiosCommonServices.get(url, { ...config });
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

    config.headers = {
      ...config.headers,
      'x-organization-id': ORGANIZATION_ID,
      'Content-Type': 'application/json',
    };
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const res = await axiosCommonServices.post(url, config.data, config);
    return res.data;
  } catch (error) {
    Logger.error('Fetcher Post Error:', error);
    throw error;
  }
};

export const fetcherPut = async (args: string | [string, FetcherConfig?]): Promise<any> => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const token = await getAccessToken();
  const headers = {
    ...(config?.headers || {}),
    'x-organization-id': ORGANIZATION_ID,
    'Content-Type': 'application/json',
  };
  if (token) { 
    (headers as Record<string, any>)['Authorization'] = `Bearer ${token}`;

  }

  const res = await axiosCommonServices.put(url, { ...config?.data }, { ...config, headers });

  return res.data;
};