import axios from 'axios';
import Logger from '../utils/logger';

const api = axios.create({
  baseURL: 'https://qa.common.dhanman.com/',
});

export const generateNewToken = async (): Promise<string> => {
  try {
    const endpoint = 'get-token';
    const data = {
      phoneNumber: 'string',
      otp: 'string',
    };
    const response = await api.post(endpoint, data);
    return response.data.access_token;
  } catch (error) {
    Logger.error('Error posting token:', error);
    throw error;
  }
};
