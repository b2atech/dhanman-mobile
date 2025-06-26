import {fetcherPost} from '../../utils/axiosSales';

export const endpoints = {
  list: '/',
  insert: 'v1/invoice',
};
export const insertInvoice = async invoice => {
  try {
    const response = await fetcherPost(endpoints.insert, {data: invoice});
    return response;
  } catch (error) {
    console.error('Error adding Invoice:', error);
    throw error;
  }
};
