// services/FCMService.js
// Firebase FCM service temporarily disabled
// import messaging from '@react-native-firebase/messaging';
// import app from '@react-native-firebase/app';

// Request permission to receive notifications
export async function requestUserPermission(setFcmToken) {
  // Firebase messaging temporarily disabled
  console.log('Firebase messaging disabled - skipping permission request');
  // const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // console.log('service', messaging.serverKey);
  // if (enabled) {
  //   console.log('Authorization status:', authStatus);
  //   getFcmToken(setFcmToken);
  // }
}

// Get the FCM token
async function getFcmToken(setFcmToken) {
  // Firebase messaging temporarily disabled
  console.log('Firebase messaging disabled - skipping token generation');
  // const fcmToken = await messaging().getToken();
  // if (fcmToken) {
  //   console.log('Your Firebase Token is:', fcmToken);
  //   setFcmToken(fcmToken);
  // } else {
  //   console.log('Failed', 'No token received');
  // }
}

export function notificationListener(setNotificationData) {
  // Firebase messaging temporarily disabled
  console.log('Firebase messaging disabled - skipping notification listener');
  // messaging().onMessage(async remoteMessage => {
  //   const {title, body} = remoteMessage.notification || {};
  //   const guestId = remoteMessage.data?.guestId;
  //   console.log('message', remoteMessage);
  //   setNotificationData({
  //     title,
  //     body,
  //     guestId,
  //   });
  // });

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Background Notification:', remoteMessage);
  // });
}
