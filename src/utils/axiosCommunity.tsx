import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getTokenSecurely } from './secureStorage';
import Logger from './logger';

const ORGANIZATION_ID = 'acc867cb-af91-4746-862d-139682d5c3e3';

const axiosCommunityServices = axios.create({
  baseURL: 'https://qa.community.dhanman.com/api/',
  timeout: 10000, // 10 seconds timeout
});

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

axiosCommunityServices.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401
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
  }
);

export default axiosCommunityServices;

interface FetcherConfig extends AxiosRequestConfig {
  data?: any;
}

// Utility to build headers with organization and token
function buildHeaders(token?: string | null, existingHeaders?: Record<string, any>)
{
  const headers: Record<string, any> = {
    ...(existingHeaders || {}),
    'x-organization-id': ORGANIZATION_ID,
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const fetcher = async (url: string, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    Logger.debug('Making request to:', url);
    Logger.debug('Token available:', !!token);
    Logger.debug('Config', config);

    config.headers = buildHeaders(token, config.headers);

    Logger.debug('Request config:', {
      url,
      method: 'GET',
      headers: config.headers,
      baseURL: axiosCommunityServices.defaults.baseURL,
    });

    const res = await axiosCommunityServices.get(url, { ...config });
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

export const fetcherPost = async (url: string, data: any = {}, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    config.headers = buildHeaders(token, config.headers);

    const res = await axiosCommunityServices.post(url, data, config);

    return res.data;
  } catch (error) {
    Logger.error('Fetcher Post Error:', error);
    throw error;
  }
};

export const fetcherPut = async (url: string, data: any = {}, config: FetcherConfig = {}): Promise<any> => {
  try {
    const token = await getAccessToken();
    config.headers = buildHeaders(token, config.headers);

    const res = await axiosCommunityServices.put(url, data, config);
    return res.data;
  } catch (error) {
    Logger.error('Fetcher Put Error:', error);
    throw error;
  }
};