import {fetcher, fetcherPost} from '../../utils/axiosCommunity';

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
    const response = await fetcher(endpoints.getAllServiceProviders);
    return response.items;
  } catch (error) {
    console.error('Service Providers Error:', error);
    throw error;
  }
};

export const getServiceProviderNames = async () => {
  try {
    const response = await fetcher(endpoints.getServiceProviderNames);
    return response.items;
  } catch (error) {
    console.error('Service Providers Error:', error);
    throw error;
  }
};

export const getServiceProviderType = async () => {
  try {
    const response = await fetcher(endpoints.types);
    return response.items;
  } catch (error) {
    console.error('Service Provider Type Error:', error);
    throw error;
  }
};

export const getServiceProviderSubType = async () => {
  try {
    const response = await fetcher(endpoints.subTypes);
    return response.items;
  } catch (error) {
    console.error('Service Provider SubType Error:', error);
    throw error;
  }
};

export const addServiceProvider = async serviceProvider => {
  try {
    const response = await fetcherPost([
      endpoints.insert,
      {data: serviceProvider},
    ]);
    return response;
  } catch (error) {
    console.error('Error adding Service Provider:', error);
    throw error;
  }
};
