import NetInfo from '@react-native-community/netinfo';

export const checkNetworkConnectivity = async () => {
  try {
    const state = await NetInfo.fetch();
    console.log('Network state:', {
      isConnected: state.isConnected,
      isInternetReachable: state.isInternetReachable,
      type: state.type,
      isWifi: state.type === 'wifi',
      isCellular: state.type === 'cellular',
    });
    return state.isConnected && state.isInternetReachable;
  } catch (error) {
    console.error('Error checking network connectivity:', error);
    return false;
  }
};

export const testApiEndpoints = async () => {
  const endpoints = [
    'https://qa.common.dhanman.com/api/',
    'https://qa.community.dhanman.com/api/',
    'https://qa.sales.dhanman.com/api/',
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing endpoint: ${endpoint}`);
      const response = await fetch(endpoint, {
        method: 'HEAD',
        timeout: 5000,
      });
      console.log(`✅ ${endpoint} - Status: ${response.status}`);
    } catch (error) {
      console.error(`❌ ${endpoint} - Error: ${error.message}`);
    }
  }
};
