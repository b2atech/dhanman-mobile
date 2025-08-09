import {fetcher} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  getBuildingNameByAptId: 'v1/apartments/{0}/building-names',
};

export interface Building {
  id: number;
  name: string;
  apartmentId: number;
}

export interface BuildingsResponse {
  cursor?: string;
  items: Building[];
}

export const getBuildingNames = async (apartmentId: string | number): Promise<Building[]> => {
  try {
    const url = endpoints.getBuildingNameByAptId.replace('{0}', String(apartmentId));
    Logger.apiCall('GET', url);
    Logger.debug('Fetching building names', { apartmentId });

    const response: BuildingsResponse = await fetcher(url);
    Logger.debug('Building names fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching buildings', error, { apartmentId });
    throw error;
  }
};
