import apiClient from '../../utils/axiosCommon';
import Logger from '../../utils/logger';

export const getOTP = async (otpService: any) => {
  try {
    Logger.apiCall('POST', 'v1/message');
    Logger.debug('Requesting OTP service', { otpService });

    const response = await apiClient.post('v1/message', otpService);
    Logger.debug('OTP service response received', { count: response.data.items?.length });
    return response.data.items;
  } catch (error) {
    Logger.error('Error fetching service providers', error, { otpService });
    throw error;
  }
};
