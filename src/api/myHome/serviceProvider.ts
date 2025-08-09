import {fetcher, fetcherPost} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  key: 'v1/serviceProviderSubType',
  subTypes: 'v1/service-provider-sub-type',
  types: 'v1/service-provider-type',
  getAllServiceProviders: 'v1/service-providers',
  insert: 'v1/service-providers',
  getServiceProviderNames: 'v1/service-provider-names',
};

export const getAllServiceProviders = async () => {
  try {
    Logger.apiCall('GET', endpoints.getAllServiceProviders);
    Logger.debug('Fetching all service providers');

    const response = await fetcher(endpoints.getAllServiceProviders);
    Logger.debug('Service providers fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Service Providers Error', error);
    throw error;
  }
};

export const getServiceProviderNames = async () => {
  try {
    Logger.apiCall('GET', endpoints.getServiceProviderNames);
    Logger.debug('Fetching service provider names');

    const response = await fetcher(endpoints.getServiceProviderNames);
    Logger.debug('Service provider names fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Service Provider Names Error', error);
    throw error;
  }
};

export const getServiceProviderType = async () => {
  try {
    Logger.apiCall('GET', endpoints.types);
    Logger.debug('Fetching service provider types');

    const response = await fetcher(endpoints.types);
    Logger.debug('Service provider types fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Service Provider Type Error', error);
    throw error;
  }
};

export const getServiceProviderSubType = async () => {
  try {
    Logger.apiCall('GET', endpoints.subTypes);
    Logger.debug('Fetching service provider sub types');

    const response = await fetcher(endpoints.subTypes);
    Logger.debug('Service provider sub types fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Service Provider SubType Error', error);
    throw error;
  }
};

export const addServiceProvider = async (serviceProvider: any) => {
  try {
    Logger.apiCall('POST', endpoints.insert);
    Logger.debug('Adding service provider', { serviceProvider });

    const response = await fetcherPost(endpoints.insert, {data: serviceProvider});
    Logger.debug('Service provider added successfully');
    return response;
  } catch (error) {
    Logger.error('Error adding Service Provider', error, { serviceProvider });
    throw error;
  }
};
