import {fetcher} from '../../utils/axiosCommunity';

export const endpoints = {
  list: '/',
  getUnitNamesByAllIds: 'v1/apartments/{0}/buildings/{1}/floors/{2}/unit-names',
  getUnitsByUserId: 'v1/users/{0}/apartments/{1}/unit-id',
  getById: 'v1/unit',
};
export const getUnitNames = async (apartmentId, buildingId, floorId) => {
  try {
    const url = endpoints.getUnitNamesByAllIds
      .replace('{0}', apartmentId)
      .replace('{1}', buildingId?.toString() ?? '')
      .replace('{2}', floorId?.toString() ?? '');

    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching unit names', error);
    throw error;
  }
};

export const getUnits = async unitID => {
  try {
    const url = `${endpoints.getById}${endpoints.list}${unitID}`;
    const response = await fetcher(url);
    return response;
  } catch (error) {
    console.error('Error fetching units', error);
    throw error;
  }
};

export const getUnitsByUserId = async (apartmentId, dhanmanId) => {
  try {
    const url = endpoints.getUnitsByUserId
      .replace('{0}', dhanmanId)
      .replace('{1}', apartmentId);
    const response = await fetcher(url);
    return response;
  } catch (error) {
    console.error('Error fetching unit by user id', error);
    throw error;
  }
};
