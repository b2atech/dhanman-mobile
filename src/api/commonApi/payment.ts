import {fetcherPost} from '../../utils/axiosCommon';
import Logger from '../../utils/logger';

export const endpoints = {
  list: '/',
  createPaymentLink: 'v1/generate-link',
};

export const createPaymentLink = async (paymentData: any) => {
  try {
    Logger.apiCall('POST', endpoints.createPaymentLink);
    Logger.debug('Creating payment link', { paymentData });
    const response = await fetcherPost(endpoints.createPaymentLink, { data: paymentData });
    Logger.debug('Payment link created successfully', { response });
    return response;
  } catch (error) {
    Logger.error('Error creating payment link', error, { paymentData });
    throw error;
  }
};
