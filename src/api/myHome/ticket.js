import {fetcher, fetcherPost} from '../../utils/axiosCommunity';

export const endpoints = {
  getTicket: 'v1/tickets/{0}',
  getTicketCategories: 'v1/ticket-categories',
  getTicketProirity: 'v1/ticket-priorities',
  insert: 'v1/tickets',
};

export const getTicket = async apartmentId => {
  try {
    const response = await fetcher(
      endpoints.getTicket.replace('{0}', apartmentId),
    );
    return response.items;
  } catch (error) {
    console.error('Ticket error:', error);
    throw error;
  }
};

export const getTicketCategories = async () => {
  try {
    const response = await fetcher(endpoints.getTicketCategories);
    return response.items;
  } catch (error) {
    console.error('Ticket Categories error:', error);
    throw error;
  }
};

export const getTicketPrioirity = async () => {
  try {
    const response = await fetcher(endpoints.getTicketProirity);
    return response.items;
  } catch (error) {
    console.error('Ticket Proirity error:', error);
    throw error;
  }
};

export const createTicket = async ticket => {
  try {
    const response = await fetcherPost('v1/tickets', ticket);
    return response.data;
  } catch (error) {
    console.error('Error adding ticket', error);
    throw error;
  }
};
