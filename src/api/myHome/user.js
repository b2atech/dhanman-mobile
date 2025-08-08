import {fetcher} from '../../utils/axiosCommunity';

export const getUsers = async () => {
  try {
    const url = 'v1/users';

    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching users', error);
    throw error;
  }
};
