import {fetcher, fetcherPost} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

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

export const getVisitors = async (identityTypeId: string | number) => {
  const url = `${endpoints.key}${endpoints.list}${identityTypeId}`;
  try {
    Logger.apiCall('GET', url);
    Logger.debug('Fetching visitors', { identityTypeId });

    const response = await fetcher(url);
    Logger.debug('Visitors fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching visitors', error, { identityTypeId });
    throw error;
  }
};

export const addVisitor = async (visitor: any) => {
  try {
    Logger.apiCall('POST', endpoints.insert);
    Logger.debug('Adding visitor', { visitor });

    const response = await fetcherPost(endpoints.insert, visitor);
    Logger.debug('Visitor added successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error adding visitor', error, { visitor });
    throw error;
  }
};

export const addVisitorPending = async (visitorPending: any) => {
  try {
    Logger.apiCall('POST', endpoints.visitorPending);
    Logger.debug('Adding visitor pending', { visitorPending });

    const response = await fetcherPost(endpoints.visitorPending, visitorPending);
    Logger.debug('Visitor pending added successfully');
    return response;
  } catch (error) {
    Logger.error('Error adding visitor pending', error, { visitorPending });
    throw error;
  }
};

export const getVisitorByUnitId = async (apartmentId: string | number, unitId: string | number) => {
  const url = endpoints.visitorsByUnit
    .replace('{0}', String(apartmentId))
    .replace('{1}', String(unitId));
  try {
    Logger.apiCall('GET', url);
    Logger.debug('Fetching visitors by unit ID', { apartmentId, unitId });

    const response = await fetcher(url);
    Logger.debug('Visitors by unit ID fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching visitors by unit ID', error, { apartmentId, unitId });
    throw error;
  }
};

export const getVisitorType = async () => {
  try {
    Logger.apiCall('GET', endpoints.visitorTypes);
    Logger.debug('Fetching visitor types');

    const response = await fetcher(endpoints.visitorTypes);
    Logger.debug('Visitor types fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching visitor types', error);
    throw error;
  }
};

export const getVisitorIdentityType = async () => {
  try {
    Logger.apiCall('GET', endpoints.visitorIdentityTypes);
    Logger.debug('Fetching visitor identity types');

    const response = await fetcher(endpoints.visitorIdentityTypes);
    Logger.debug('Visitor identity types fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching visitor identity types', error);
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
