import { fetcher, commonApiClient } from '../commonApi';

export const endpoints = {
  list: '/',
  getAccount: 'v1/organizations/{0}/accounts',
};

export const getOrganizationAccounts = async (organizationId: string) => {
  try {
    const url = endpoints.getAccount.replace('{0}', organizationId);
    const response = await fetcher(url, commonApiClient);
    return response.items;
  } catch (error) {
    console.error('Error fetching organization accounts', error);
    throw error;
  }
};
