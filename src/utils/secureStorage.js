import * as Keychain from 'react-native-keychain';
export const serviceFor = (key) => `com.dhanman.secure.${key}`;

export const getTokenSecurely = async (key) => {
    try {
      const creds = await Keychain.getGenericPassword({
        service: serviceFor(key),
      });
      return creds ? creds.password : null;
    } catch (error) {
      console.error(`Error getting ${key} from Keychain:`, error);
      // Fallback
      //return await AsyncStorage.getItem(key);
    }
  };
