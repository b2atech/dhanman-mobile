import {fetcherPost} from '../../utils/axiosCommunity';

export const endpoints = {
  list: '/',
  insert: 'v1/residents',
};

export const insertResident = async resident => {
  try {
    const response = await fetcherPost(endpoints.insert, {data: resident});

    return response;
  } catch (error) {
    console.error('Error adding Resident:', error);
    throw error;
  }
};
