import {fetcher} from '../../utils/axiosCommon';

export const endpoints = {
  usersPermissions: 'v1/permissions',
  usersPermissionsById: 'v1/organizations/{0}/users/{1}/permissions',
  list: '/',
};
export const useGetUserPermission = async (organizationId, userId) => {
  try {
    const url = endpoints.usersPermissionsById
      .replace('{0}', organizationId)
      .replace('{1}', userId);
    console.log('Fetching user permissions for:', {organizationId, userId});
    console.log('Request URL:', url);

    const response = await fetcher(url);
    console.log('User permissions response:', response);
    return response.items;
  } catch (error) {
    console.error('Error fetching user permission by id:', {
      error: error.message,
      organizationId,
      userId,
      url: endpoints.usersPermissionsById
        .replace('{0}', organizationId)
        .replace('{1}', userId),
    });
    throw error;
  }
};

export const useGetAllPermission = async () => {
  try {
    console.log('Fetching all permissions from:', endpoints.usersPermissions);
    const response = await fetcher(endpoints.usersPermissions);
    console.log('All permissions response:', response);
    return response.items;
  } catch (error) {
    console.error('Error fetching user permission:', {
      error: error.message,
      endpoint: endpoints.usersPermissions,
    });
    throw error;
  }
};
