import { fetcher } from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  getFloorNamesByAptId: 'v1/apartments/{0}/buildings/{1}/floor-names',
};

export const getFloorName = async (apartmentId: string | number, buildingId: string | number) => {
  try {
    const url = endpoints.getFloorNamesByAptId
      .replace('{0}', String(apartmentId))
      .replace('{1}', String(buildingId));

    Logger.apiCall('GET', url);
    Logger.debug('Fetching floor names', { apartmentId, buildingId });

    const response = await fetcher(url);
    Logger.debug('Floor names fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching floor names', error, { apartmentId, buildingId });
    throw error;
  }
};
