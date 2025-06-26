import apiClient from '../../utils/axiosCommon';

export const getOTP = async otpService => {
  try {
    const response = await apiClient.post('v1/message', otpService);
    return response.data.items;
  } catch (error) {
    console.error('Error fetching service providers', error);
    throw error;
  }
};
