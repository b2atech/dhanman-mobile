import {fetcherPost} from '../../utils/axiosSales';
import Logger from '../../utils/logger';

export const endpoints = {
  list: '/',
  insert: 'v1/invoice',
};

export const insertInvoice = async (invoice: any) => {
  try {
    Logger.apiCall('POST', endpoints.insert);
    Logger.debug('Inserting invoice', { invoice });

    const response = await fetcherPost(endpoints.insert, {data: invoice});
    Logger.debug('Invoice inserted successfully');
    return response;
  } catch (error) {
    Logger.error('Error adding Invoice', error, { invoice });
    throw error;
  }
};
