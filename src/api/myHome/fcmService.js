import {fetcherPost} from '../../utils/axiosCommunity';

export const endpoints = {
  SaveFCMToken: 'v1/resident-token',
  GuestNotification: 'v1/guest-notification',
};
export const SaveFCMToken = async fcmToken => {
  const url = endpoints.SaveFCMToken;
  try {
    const response = await fetcherPost(url, fcmToken);
    return response.data;
  } catch (error) {
    console.error('Error adding FCM token', error);
    throw error;
  }
};

export const SaveGuestNotification = async notification => {
  const url = endpoints.GuestNotification;
  try {
    const response = await fetcherPost(url, notification);
    return response.data;
  } catch (error) {
    console.error('Error sending notification', error);
    throw error;
  }
};
