import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../app/config';
import { captureException } from '../app/sentry';
import { getTokenSecurely } from '../utils/secureStorage';

const ORGANIZATION_ID = 'acc867cb-af91-4746-862d-139682d5c3e3';

// Factory to create axios instance with required interceptors
const createApiClient = (baseURL: string): AxiosInstance => {
  const apiClient = axios.create({
    baseURL,
    timeout: config.apiTimeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor: always add auth token and organization id
  apiClient.interceptors.request.use(
    async (requestConfig: InternalAxiosRequestConfig) => {
      try {
        const token = await getTokenSecurely('userToken');
        // Ensure headers object exists and update directly!
        requestConfig.headers['x-organization-id'] = ORGANIZATION_ID;
        requestConfig.headers['Content-Type'] = 'application/json';
        if (token) {
          requestConfig.headers['Authorization'] = `Bearer ${token}`;
        }

        // Conditional logging: check config.enableLogging or global config
        if ((requestConfig as any).enableLogging || config.enableLogging) {
          console.log('API Request:', {
            method: requestConfig.method,
            url: requestConfig.url,
            baseURL: requestConfig.baseURL,
            headers: requestConfig.headers,
            data: requestConfig.data,
          });
        }
      } catch (error) {
        console.error('Error setting headers:', error);
      }
      return requestConfig;
    },
    (error) => {
      captureException(error, { context: 'request_interceptor' });
      return Promise.reject(error);
    }
  );

  // Response interceptor for logging and error handling
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      if ((response.config as any).enableLogging || config.enableLogging) {
        console.log('API Response:', {
          url: response.config.url,
          method: response.config.method,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          data: response.data,
        });
      }
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        console.log('Unauthorized access detected');
        // Optionally, trigger logout or redirect logic here
      }

      const errorMessage =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response?.data : undefined) ||
        error.message ||
        'API Error';

      // Enhanced error logging
      captureException(error, {
        url: error.config?.url,
        method: error.config?.method,
        requestHeaders: error.config?.headers,
        requestData: error.config?.data,
        status: error.response?.status,
        responseHeaders: error.response?.headers,
        responseData: error.response?.data,
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

// Generic fetcher functions (headers handled in interceptor)
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