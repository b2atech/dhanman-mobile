import {fetcher} from '../../utils/axiosCommon';
import Logger from '../../utils/logger';
import { Country, State, CountriesResponse, StatesResponse } from '../../types/address';

export const endpoints = {
  list: '/',
  country: 'v1/countries',
  state: 'v1/countries/{countryId}/states',
};

export const getCountries = async (): Promise<Country[]> => {
  try {
    Logger.apiCall('GET', endpoints.country);
    Logger.debug('Fetching countries');

    const response: CountriesResponse = await fetcher(endpoints.country);
    Logger.debug('Countries fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching countries', error);
    throw error;
  }
};

export const getStates = async (countryId: string | number): Promise<State[]> => {
  try {
    const url = endpoints.state.replace('{countryId}', String(countryId));
    Logger.apiCall('GET', url);
    Logger.debug('Fetching states', { countryId });

    const response: StatesResponse = await fetcher(url);
    Logger.debug('States fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching states', error, { countryId });
    throw error;
  }
};
