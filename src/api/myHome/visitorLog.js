import {fetcher, fetcherPost, fetcherPut} from '../../utils/axiosCommunity';

export const endpoints = {
  list: '/',
  get: 'v1/apartments/{0}/visitors/{1}/visitorTypeIds/{2}/visitorLogs',
  insert: 'v1/visitor-log',
  visitorsByUnitId: 'v1/apartments/{1}/units/{2}/visitorsByUnitId',
  getAllVisitorLog: 'v1/apartments/{0}/dates/{1}/visitorLogs',
  checkOut: 'v1/check-out',
  approve: 'v1/approve',
  reject: 'v1/reject',
  insertPreApprove: 'v1/visitor-approval',
};
export const getVisitorsLog = async (apartmentId, visitorId, visitorTypeId) => {
  try {
    const url = endpoints.get
      .replace('{0}', apartmentId)
      .replace('{1}', visitorId)
      .replace('{2}', visitorTypeId);
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching visitors Log', error);
    throw error;
  }
};

export const addVisitorLog = async visitorLog => {
  try {
    const response = await fetcherPost(endpoints.insert, visitorLog);
    return response.data;
  } catch (error) {
    console.error('Error adding visitor Log', error);
    throw error;
  }
};

export const getVisitorsByUnitId = async (apartmentId, unitId) => {
  try {
    const url = endpoints.visitorsByUnitId
      .replace('{0}', apartmentId)
      .replace('{1}', unitId);
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching visitors By Unit', error);
    throw error;
  }
};

export const getAllVisitorsLog = async (apartmentId, date) => {
  try {
    const url = endpoints.getAllVisitorLog
      .replace('{0}', apartmentId)
      .replace('{1}', date);

    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching Visitors Log', error);
    throw error;
  }
};

export const visitorCheckOut = async visitorId => {
  try {
    const response = await fetcherPut(endpoints.checkOut, visitorId);
    return response.data;
  } catch (error) {
    console.error('Error updating visitor log', error);
    throw error;
  }
};
export const visitorApprove = async visitorId => {
  try {
    const response = await fetcherPut(endpoints.approve, visitorId);
    return response.data;
  } catch (error) {
    console.error('Error updating visitor log', error);
    throw error;
  }
};
export const visitorReject = async visitorId => {
  try {
    const response = await fetcherPut(endpoints.reject, visitorId);
    return response.data;
  } catch (error) {
    console.error('Error updating visitor log', error);
    throw error;
  }
};

export const addPreApprovedVisitor = async PreApprovedVisitor => {
  try {
    const response = await fetcherPost(
      endpoints.insertPreApprove,
      PreApprovedVisitor,
    );
    return response.data;
  } catch (error) {
    console.error('Error adding Pre Approved Visitor ', error);
    throw error;
  }
};
