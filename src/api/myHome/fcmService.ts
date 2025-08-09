import {fetcherPost} from '../../utils/axiosCommunity';
import Logger from '../../utils/logger';

export const endpoints = {
  SaveFCMToken: 'v1/resident-token',
  GuestNotification: 'v1/guest-notification',
};

export const SaveFCMToken = async (fcmToken: any) => {
  const url = endpoints.SaveFCMToken;
  try {
    Logger.apiCall('POST', url);
    Logger.debug('Saving FCM token', { fcmToken });

    const response = await fetcherPost(url, fcmToken);
    Logger.debug('FCM token saved successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error adding FCM token', error, { fcmToken });
    throw error;
  }
};

export const SaveGuestNotification = async (notification: any) => {
  const url = endpoints.GuestNotification;
  try {
    Logger.apiCall('POST', url);
    Logger.debug('Saving guest notification', { notification });

    const response = await fetcherPost(url, notification);
    Logger.debug('Guest notification saved successfully');
    return response.data;
  } catch (error) {
    Logger.error('Error sending notification', error, { notification });
    throw error;
  }
};
