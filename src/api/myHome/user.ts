import {fetcher} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';
import { User, UsersResponse } from '../../types/user';

export const getUsers = async (): Promise<User[]> => {
  try {
    const url = 'v1/users';
    Logger.apiCall('GET', url);
    Logger.debug('Fetching users');

    const response: UsersResponse = await fetcher(url);
    Logger.debug('Users fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching users', error);
    throw error;
  }
};
