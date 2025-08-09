import {fetcher, fetcherPost} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  getTicket: 'v1/tickets/{0}',
  getTicketCategories: 'v1/ticket-categories',
  getTicketProirity: 'v1/ticket-priorities',
  insert: 'v1/tickets',
};

export const getTicket = async (apartmentId: string | number) => {
  try {
    const url = endpoints.getTicket.replace('{0}', String(apartmentId));
    Logger.apiCall('GET', url);
    Logger.debug('Fetching tickets', { apartmentId });

    const response = await fetcher(url);
    Logger.debug('Tickets fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Ticket error', error, { apartmentId });
    throw error;
  }
};

export const getTicketCategories = async () => {
  try {
    Logger.apiCall('GET', endpoints.getTicketCategories);
    Logger.debug('Fetching ticket categories');

    const response = await fetcher(endpoints.getTicketCategories);
    Logger.debug('Ticket categories fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Ticket Categories error', error);
    throw error;
  }
};

export const getTicketPrioirity = async () => {
  try {
    Logger.apiCall('GET', endpoints.getTicketProirity);
    Logger.debug('Fetching ticket priorities');

    const response = await fetcher(endpoints.getTicketProirity);
    Logger.debug('Ticket priorities fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Ticket Priority error', error);
    throw error;
  }
};

export const createTicket = async (ticket: any) => {
  try {
    Logger.apiCall('POST', 'v1/tickets');
    Logger.debug('Creating ticket', { ticket });

    const response = await fetcherPost('v1/tickets', ticket);
    Logger.debug('Ticket created successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error adding ticket', error, { ticket });
    throw error;
  }
};
