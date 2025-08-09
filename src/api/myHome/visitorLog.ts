import {fetcher, fetcherPost, fetcherPut} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';
import {
  VisitorLog,
  VisitorLogsResponse,
  VisitorLogsByUnitResponse,
  CreateVisitorLogRequest,
  VisitorLogStatusUpdate,
  PreApprovedVisitorRequest,
} from '../../types/visitorLog';

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

export const getVisitorsLog = async (apartmentId: string | number, visitorId: string | number, visitorTypeId: string | number): Promise<VisitorLog[]> => {
  try {
    const url = endpoints.get
      .replace('{0}', String(apartmentId))
      .replace('{1}', String(visitorId))
      .replace('{2}', String(visitorTypeId));

    Logger.apiCall('GET', url);
    Logger.debug('Fetching visitors log', { apartmentId, visitorId, visitorTypeId });

    const response: VisitorLogsResponse = await fetcher(url);
    Logger.debug('Visitors log fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching visitors Log', error, { apartmentId, visitorId, visitorTypeId });
    throw error;
  }
};

export const addVisitorLog = async (visitorLog: CreateVisitorLogRequest): Promise<VisitorLog> => {
  try {
    Logger.apiCall('POST', endpoints.insert);
    Logger.debug('Adding visitor log', { visitorLog });

    const response = await fetcherPost(endpoints.insert, visitorLog);
    Logger.debug('Visitor log added successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error adding visitor Log', error, { visitorLog });
    throw error;
  }
};

export const getVisitorsByUnitId = async (apartmentId: string | number, unitId: string | number): Promise<VisitorLog[]> => {
  try {
    const url = endpoints.visitorsByUnitId
      .replace('{0}', String(apartmentId))
      .replace('{1}', String(unitId));

    Logger.apiCall('GET', url);
    Logger.debug('Fetching visitors by unit ID', { apartmentId, unitId });

    const response: VisitorLogsByUnitResponse = await fetcher(url);
    Logger.debug('Visitors by unit ID fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching visitors By Unit', error, { apartmentId, unitId });
    throw error;
  }
};

export const getAllVisitorsLog = async (apartmentId: string | number, date: string): Promise<VisitorLog[]> => {
  try {
    const url = endpoints.getAllVisitorLog
      .replace('{0}', String(apartmentId))
      .replace('{1}', date);

    Logger.apiCall('GET', url);
    Logger.debug('Fetching all visitors log', { apartmentId, date });

    const response: VisitorLogsResponse = await fetcher(url);
    Logger.debug('All visitors log fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching Visitors Log', error, { apartmentId, date });
    throw error;
  }
};

export const visitorCheckOut = async (visitorId: VisitorLogStatusUpdate): Promise<VisitorLog> => {
  try {
    Logger.apiCall('PUT', endpoints.checkOut);
    Logger.debug('Checking out visitor', { visitorId });

    const response = await fetcherPut(endpoints.checkOut, visitorId);
    Logger.debug('Visitor checked out successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error updating visitor log', error, { visitorId });
    throw error;
  }
};

export const visitorApprove = async (visitorId: VisitorLogStatusUpdate): Promise<VisitorLog> => {
  try {
    Logger.apiCall('PUT', endpoints.approve);
    Logger.debug('Approving visitor', { visitorId });

    const response = await fetcherPut(endpoints.approve, visitorId);
    Logger.debug('Visitor approved successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error updating visitor log', error, { visitorId });
    throw error;
  }
};

export const visitorReject = async (visitorId: VisitorLogStatusUpdate): Promise<VisitorLog> => {
  try {
    Logger.apiCall('PUT', endpoints.reject);
    Logger.debug('Rejecting visitor', { visitorId });

    const response = await fetcherPut(endpoints.reject, visitorId);
    Logger.debug('Visitor rejected successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error updating visitor log', error, { visitorId });
    throw error;
  }
};

export const addPreApprovedVisitor = async (PreApprovedVisitor: PreApprovedVisitorRequest): Promise<VisitorLog> => {
  try {
    Logger.apiCall('POST', endpoints.insertPreApprove);
    Logger.debug('Adding pre-approved visitor', { PreApprovedVisitor });

    const response = await fetcherPost(endpoints.insertPreApprove, PreApprovedVisitor);
    Logger.debug('Pre-approved visitor added successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error adding Pre Approved Visitor', error, { PreApprovedVisitor });
    throw error;
  }
};
