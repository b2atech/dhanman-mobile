import * as Keychain from 'react-native-keychain';
import Logger from './logger';

export const serviceFor = (key: string): string => `com.dhanman.secure.${key}`;

export const getTokenSecurely = async (key: string): Promise<string | null> => {
  try {
    const creds = await Keychain.getGenericPassword({
      service: serviceFor(key),
    });
    const token = creds ? creds.password : null;
    Logger.tokenStorage('retrieve', !!token);
    return token;
  } catch (error) {
    Logger.error(`Error getting ${key} from Keychain`, error);
    Logger.tokenStorage('retrieve', false);
    // Fallback
    //return await AsyncStorage.getItem(key);
    return null;
  }
};

export const setTokenSecurely = async (key: string, token: string): Promise<void> => {
  try {
    await Keychain.setGenericPassword('token', token, {
      service: serviceFor(key),
    });
    Logger.tokenStorage('store', true);
  } catch (error) {
    Logger.error(`Error setting ${key} in Keychain`, error);
    Logger.tokenStorage('store', false);
    // Fallback
    //await AsyncStorage.setItem(key, token);
  }
};
