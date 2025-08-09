import {fetcherPost} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  list: '/',
  insert: 'v1/residents',
};

export const insertResident = async (resident: any) => {
  try {
    Logger.apiCall('POST', endpoints.insert);
    Logger.debug('Inserting resident', { resident });

    const response = await fetcherPost(endpoints.insert, {data: resident});
    Logger.debug('Resident inserted successfully');
    return response;
  } catch (error) {
    Logger.error('Error adding Resident', error, { resident });
    throw error;
  }
};
