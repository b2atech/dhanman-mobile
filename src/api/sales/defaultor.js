import {fetcher} from '../../utils/axiosSales';

export const endpoints = {
  getdefalutorTotal: 'v1/companies/{0}/defaultor-total',
  getdefalutors: 'v1/companies/{0}/defaultors',
};
export const getdefalutors = async apartmentId => {
  try {
    const url = endpoints.getdefalutors.replace('{0}', apartmentId);
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching defaultors', error);
    throw error;
  }
};

export const getdefalutorTotal = async apartmentId => {
  try {
    const url = endpoints.getdefalutorTotal.replace('{0}', apartmentId);
    const response = await fetcher(url);
    return response;
  } catch (error) {
    console.error('Error fetching defalutor total', error);
    throw error;
  }
};
