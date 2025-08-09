import {fetcher} from '../../utils/axiosCommon';
import Logger from '../../utils/logger';

export const endpoints = {
  list: '/',
  country: 'v1/countries',
  state: 'v1/countries/{countryId}/states',
};

export const getCountries = async () => {
  try {
    Logger.apiCall('GET', endpoints.country);
    Logger.debug('Fetching countries');

    const response = await fetcher(endpoints.country);
    Logger.debug('Countries fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching countries', error);
    throw error;
  }
};

export const getStates = async (countryId: string | number) => {
  try {
    const url = endpoints.state.replace('{countryId}', String(countryId));
    Logger.apiCall('GET', url);
    Logger.debug('Fetching states', { countryId });

    const response = await fetcher(url);
    Logger.debug('States fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching states', error, { countryId });
    throw error;
  }
};
