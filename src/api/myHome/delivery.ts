import {fetcher} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  delivery: 'v1/delivery-companies',
};

export const getDeliveryCompanies = async () => {
  try {
    Logger.apiCall('GET', endpoints.delivery);
    Logger.debug('Fetching delivery companies');

    const response = await fetcher(endpoints.delivery);
    Logger.debug('Delivery companies fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching delivery companies', error);
    throw error;
  }
};
