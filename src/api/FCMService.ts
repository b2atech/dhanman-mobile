// Firebase FCM service (currently disabled)
// import messaging from '@react-native-firebase/messaging';
// import app from '@react-native-firebase/app';

export async function requestUserPermission(setFcmToken: (token: string | null) => void): Promise<void> {
  // Firebase messaging temporarily disabled
  console.log('Firebase messaging disabled - skipping permission request');
  // Uncomment and update when Firebase is enabled
  // const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  // if (enabled) {
  //   console.log('Authorization status:', authStatus);
  //   getFcmToken(setFcmToken);
  // }
}

// Get the FCM token
async function getFcmToken(setFcmToken: (token: string | null) => void): Promise<void> {
  // Firebase messaging temporarily disabled
  console.log('Firebase messaging disabled - skipping token generation');
  // Uncomment and update when Firebase is enabled
  // const fcmToken = await messaging().getToken();
  // if (fcmToken) {
  //   console.log('Your Firebase Token is:', fcmToken);
  //   setFcmToken(fcmToken);
  // } else {
  //   console.log('Failed', 'No token received');
  // }
}

// Notification listener
// Returns an unsubscribe function if active, otherwise undefined
export function notificationListener(
  setNotificationData: (data: any) => void
): (() => void) | undefined {
  // Firebase messaging temporarily disabled
  console.log('Firebase messaging disabled - skipping notification listener');
  // Uncomment and update when Firebase is enabled
  // const unsubscribe = messaging().onMessage(async remoteMessage => {
  //   const { title, body } = remoteMessage.notification || {};
  //   const guestId = remoteMessage.data?.guestId;
  //   setNotificationData({
  //     title,
  //     body,
  //     guestId,
  //   });
  // });
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Background Notification:', remoteMessage);
  // });
  // return unsubscribe;
  return undefined;
}