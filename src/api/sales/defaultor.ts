import {fetcher} from '../../utils/axiosSales';
import Logger from '../../utils/logger';

export const endpoints = {
  getdefalutorTotal: 'v1/companies/{0}/defaultor-total',
  getdefalutors: 'v1/companies/{0}/defaultors',
};

export const getdefalutors = async (apartmentId: string | number) => {
  try {
    const url = endpoints.getdefalutors.replace('{0}', String(apartmentId));
    Logger.apiCall('GET', url);
    Logger.debug('Fetching defaultors', { apartmentId });

    const response = await fetcher(url);
    Logger.debug('Defaultors fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching defaultors', error, { apartmentId });
    throw error;
  }
};

export const getdefalutorTotal = async (apartmentId: string | number) => {
  try {
    const url = endpoints.getdefalutorTotal.replace('{0}', String(apartmentId));
    Logger.apiCall('GET', url);
    Logger.debug('Fetching defaultor total', { apartmentId });

    const response = await fetcher(url);
    Logger.debug('Defaultor total fetched successfully');
    return response;
  } catch (error) {
    Logger.error('Error fetching defaultor total', error, { apartmentId });
    throw error;
  }
};
