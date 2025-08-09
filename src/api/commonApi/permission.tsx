import {fetcher} from '../../utils/axiosCommon';
import { IPermission, IUserPermission } from '../../types/common';
import Logger from '../../utils/logger';

export const endpoints = {
  usersPermissions: 'v1/permissions',
  usersPermissionsById: 'v1/organizations/{0}/users/{1}/permissions',
  list: '/',
};

export const useGetUserPermission = async (
  organizationId: string | undefined,
  userId: string | undefined
): Promise<IUserPermission[]> => {
  try {
    if (!organizationId || !userId) {
      throw new Error('Organization ID and User ID are required');
    }

    const url = endpoints.usersPermissionsById
      .replace('{0}', organizationId)
      .replace('{1}', userId);

    Logger.apiCall('GET', url);
    Logger.debug('Fetching user permissions', { organizationId, userId });

    const response = await fetcher(url);
    Logger.debug('User permissions response received', {
      count: response?.items?.length || 0,
    });
    return response.items || [];
  } catch (error: any) {
    Logger.error('Error fetching user permission by id', error, {
      organizationId,
      userId,
      url: endpoints.usersPermissionsById
        .replace('{0}', organizationId || '')
        .replace('{1}', userId || ''),
    });
    throw error;
  }
};

export const useGetAllPermission = async (): Promise<IPermission[]> => {
  try {
    Logger.apiCall('GET', endpoints.usersPermissions);
    Logger.debug('Fetching all permissions');

    const response = await fetcher(endpoints.usersPermissions);
    Logger.debug('All permissions response received', {
      count: response?.items?.length || 0,
    });
    return response.items || [];
  } catch (error: any) {
    Logger.error('Error fetching all permissions', error, {
      endpoint: endpoints.usersPermissions,
    });
    throw error;
  }
};
