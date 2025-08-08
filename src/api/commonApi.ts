import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../app/config';
import { captureException } from '../app/sentry';

// Create axios instance with configuration from environment
const createApiClient = (baseURL: string): AxiosInstance => {
  const apiClient = axios.create({
    baseURL,
    timeout: config.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  apiClient.interceptors.request.use(
    async (requestConfig) => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }

        if (config.enableLogging) {
          console.log('API Request:', {
            method: requestConfig.method,
            url: requestConfig.url,
            baseURL: requestConfig.baseURL,
          });
        }
      } catch (error) {
        console.error('Error setting auth token:', error);
      }
      return requestConfig;
    },
    (error) => {
      captureException(error, { context: 'request_interceptor' });
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      if (config.enableLogging) {
        console.log('API Response:', response.status, response.statusText);
      }
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.log('Unauthorized access detected');
        // Handle logout logic here if needed
      }

      const errorMessage = error.response?.data?.message || error.message || 'API Error';
      captureException(error, {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });

      return Promise.reject(new Error(errorMessage));
    }
  );

  return apiClient;
};

// Create API clients for different services
export const commonApiClient = createApiClient(config.apiBaseUrl);
export const salesApiClient = createApiClient(config.salesApiBaseUrl);
export const purchaseApiClient = createApiClient(config.purchaseApiBaseUrl);
export const myhomeApiClient = createApiClient(config.myhomeApiBaseUrl);

// Generic fetcher functions
export const fetcher = async (url: string, apiClient = commonApiClient): Promise<any> => {
  const response = await apiClient.get(url);
  return response.data;
};

export const fetcherPost = async (url: string, data: any, apiClient = commonApiClient): Promise<any> => {
  const response = await apiClient.post(url, data);
  return response.data;
};

export const fetcherPut = async (url: string, data: any, apiClient = commonApiClient): Promise<any> => {
  const response = await apiClient.put(url, data);
  return response.data;
};

export const fetcherDelete = async (url: string, apiClient = commonApiClient): Promise<any> => {
  const response = await apiClient.delete(url);
  return response.data;
};
