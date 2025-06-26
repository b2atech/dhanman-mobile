import {fetcher} from '../../utils/axiosCommon';

export const endpoints = {
  list: '/',
  getAccount: 'v1/organizations/{0}/accounts',
};

export const getOrganizationAccounts = async organizationId => {
  try {
    const url = endpoints.getAccount.replace('{0}', organizationId);
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching organization accounts', error);
    throw error;
  }
};
