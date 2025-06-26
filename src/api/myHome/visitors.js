import {fetcher, fetcherPost} from '../../utils/axiosCommunity';

export const endpoints = {
  key: 'v1/visitors',
  list: '/',
  insert: 'v1/visitor',
  delete: 'v1/visitor',
  visitorsByUnit: 'v1/apartments/{0}/units/{1}/visitorsByUnitId',
  visitorTypes: 'v1/visitor-types',
  visitorIdentityTypes: 'v1/visitor-identity-types',
  visitorPending: 'v1/visitor-pending',
};
export const getVisitors = async identityTypeId => {
  const url = `${endpoints.key}${endpoints.list}${identityTypeId}`;
  try {
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching visitors', error);
    throw error;
  }
};

export const addVisitor = async visitor => {
  try {
    const response = await fetcherPost(endpoints.insert, visitor);
    return response.data;
  } catch (error) {
    console.error('Error adding visitor', error);
    throw error;
  }
};

export const addVisitorPending = async visitorPending => {
  try {
    const response = await fetcherPost(
      endpoints.visitorPending,
      visitorPending,
    );
    return response;
  } catch (error) {
    console.error('Error adding visitor', error);
    throw error;
  }
};

export const getVisitorByUnitId = async (apartmentId, unitId) => {
  const url = endpoints.visitorsByUnit
    .replace('{0}', apartmentId)
    .replace('{1}', unitId);
  try {
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching visitors', error);
    throw error;
  }
};

export const getVisitorType = async () => {
  try {
    const response = await fetcher(endpoints.visitorTypes);
    return response.items;
  } catch (error) {
    console.error('Error fetching visitor types', error);
    throw error;
  }
};

export const getVisitorIdentityType = async () => {
  try {
    const response = await fetcher(endpoints.visitorIdentityTypes);
    return response.items;
  } catch (error) {
    console.error('Error fetching visitor identity types', error);
    throw error;
  }
};
