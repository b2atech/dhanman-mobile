import NetInfo from '@react-native-community/netinfo';
import Logger from './logger';

export const checkNetworkConnectivity = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    const isConnected = (state.isConnected && state.isInternetReachable) ?? false;
    Logger.debug('Network state', {
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
    });
    return isConnected;
  } catch (error) {
    Logger.error('Error checking network connectivity', error);
    return false;
  }
};

export const testApiEndpoints = async (): Promise<void> => {
  const endpoints = [
    'https://qa.common.dhanman.com/api/',
    'https://qa.community.dhanman.com/api/',
    'https://qa.sales.dhanman.com/api/',
  ];

  for (const endpoint of endpoints) {
    try {
      Logger.debug(`Testing endpoint: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: 'HEAD',
        // timeout: 5000, // Note: timeout is not a standard fetch option
      });
      Logger.info(`✅ ${endpoint} - Status: ${response.status}`);
    } catch (error: any) {
      Logger.error(`❌ ${endpoint} - Error: ${error.message}`);
    }
  }
};
