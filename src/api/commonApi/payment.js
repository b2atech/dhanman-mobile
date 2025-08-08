import {fetcherPost} from '../../utils/axiosCommon';

export const endpoints = {
  list: '/',
  createPaymentLink: 'v1/generate-link',
};

export const createPaymentLink = async paymnentData=> {
  try {
    const response = await fetcherPost(endpoints.createPaymentLink, { data: paymnentData });
    return response;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};
