import {fetcher} from '../../utils/axiosCommunity';

export const endpoints = {
  delivery: 'v1/delivery-companies',
};
export const getDeliveryCompanies = async () => {
  try {
    const response = await fetcher(endpoints.delivery);
    return response.items;
  } catch (error) {
    console.error('Error fetching delivery companies', error);
    throw error;
  }
};
