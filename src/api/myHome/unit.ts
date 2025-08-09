import {fetcher} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  list: '/',
  getUnitNamesByAllIds: 'v1/apartments/{0}/buildings/{1}/floors/{2}/unit-names',
  getUnitsByUserId: 'v1/users/{0}/apartments/{1}/unit-id',
  getById: 'v1/unit',
};

export const getUnitNames = async (apartmentId: string | number, buildingId: string | number, floorId: string | number) => {
  try {
    const url = endpoints.getUnitNamesByAllIds
      .replace('{0}', String(apartmentId))
      .replace('{1}', String(buildingId) ?? '')
      .replace('{2}', String(floorId) ?? '');

    Logger.apiCall('GET', url);
    Logger.debug('Fetching unit names', { apartmentId, buildingId, floorId });

    const response = await fetcher(url);
    Logger.debug('Unit names fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching unit names', error, { apartmentId, buildingId, floorId });
    throw error;
  }
};

export const getUnits = async (unitID: string | number) => {
  try {
    const url = `${endpoints.getById}${endpoints.list}${unitID}`;
    Logger.apiCall('GET', url);
    Logger.debug('Fetching units', { unitID });

    const response = await fetcher(url);
    Logger.debug('Units fetched successfully');
    return response;
  } catch (error) {
    Logger.error('Error fetching units', error, { unitID });
    throw error;
  }
};

export const getUnitsByUserId = async (apartmentId: string | number, dhanmanId: string | number) => {
  try {
    const url = endpoints.getUnitsByUserId
      .replace('{0}', String(dhanmanId))
      .replace('{1}', String(apartmentId));

    Logger.apiCall('GET', url);
    Logger.debug('Fetching unit by user id', { apartmentId, dhanmanId });

    const response = await fetcher(url);
    Logger.debug('Unit by user id fetched successfully');
    return response;
  } catch (error) {
    Logger.error('Error fetching unit by user id', error, { apartmentId, dhanmanId });
    throw error;
  }
};
