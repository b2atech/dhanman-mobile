import React, { createContext, useEffect, useReducer } from 'react';
import Auth0 from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from 'expo-secure-store';
import authReducer from '../context/auth-reducer/auth';
import { Auth0ContextType } from '../types/auth';
import { LOGOUT, LOGIN } from './auth-reducer/actions';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getUnitsByUserId } from '../api/myHome/unit';
import * as Keychain from 'react-native-keychain';
import { getTokenSecurely } from '../utils/secureStorage';

interface CustomJwtPayload extends JwtPayload {
  dhanmanId: string;
  dhanman_company: {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    addressLine: string;
    gstIn: string;
    isApartment: boolean;
  };
  dhanman_organization: {
    id: string;
    name: string;
    gstIn: string;
    pan: string;
    tan: string;
    shortName: string;
  };
  picture?: string;
  name?: string;
  dhanman_roles?: string[];
  dhanman_permissions: string[];
}

export const AuthContext = createContext<Auth0ContextType | null>(null);

export const auth0 = new Auth0({
  domain: 'dev-dhanman.us.auth0.com',
  clientId: 'fp21qh7VmYAuseleceLieieYoARKMzky',
});

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: null,
  });

  const serviceFor = (key: string) => `com.dhanman.secure.${key}`;

  // Secure token storage helper functions
  // const storeTokenSecurely = async (key: string, value: string) => {
  //   try {
  //     await SecureStore.setItemAsync(key, value);
  //   } catch (error) {
  //     console.error(`Error storing ${key} securely:`, error);
  //     // Fallback to AsyncStorage if SecureStore fails
  //     await AsyncStorage.setItem(key, value);
  //   }
  // };
  const storeTokenSecurely = async (key: string, value: string) => {
    try {
      await Keychain.setGenericPassword(
        // account (username) & password — username can be anything; keep it constant
        'token',
        value,
        {
          service: serviceFor(key),
          // Sensible defaults; adjust if you require biometrics, etc.
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        }
      );
    } catch (error) {
      console.error(`Error storing ${key} in Keychain:`, error);
      // Fallback
      //await AsyncStorage.setItem(key, value);
    }
  };

  // const getTokenSecurely = async (key: string) => {
  //   try {
  //     return await SecureStore.getItemAsync(key);
  //   } catch (error) {
  //     console.error(`Error getting ${key} securely:`, error);
  //     // Fallback to AsyncStorage if SecureStore fails
  //     return await AsyncStorage.getItem(key);
  //   }
  // };


  // const removeTokenSecurely = async (key: string) => {
  //   try {
  //     await SecureStore.deleteItemAsync(key);
  //   } catch (error) {
  //     console.error(`Error removing ${key} securely:`, error);
  //     // Fallback to AsyncStorage if SecureStore fails
  //     await AsyncStorage.removeItem(key);
  //   }
  // };
  const removeTokenSecurely = async (key: string) => {
    try {
      await Keychain.resetGenericPassword({
        service: serviceFor(key),
      });
    } catch (error) {
      console.error(`Error removing ${key} from Keychain:`, error);
      // Fallback
      await AsyncStorage.removeItem(key);
    }
  };

  // Set user state and fetch unit IDs
  const setUserState = async (decodedToken: CustomJwtPayload) => {
    console.log('Decoded Token:', decodedToken);
    if (!decodedToken.dhanmanId || !decodedToken.dhanman_company.id) {
      return;
    }
    try {
      const unitIds = await getUnitsByUserId(
        decodedToken.dhanman_company.id,
        decodedToken.dhanmanId
      );

      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            id: decodedToken?.sub?.split('|')?.[1],
            dhanmanId: decodedToken?.dhanmanId,
            avatar: decodedToken?.picture,
            name: decodedToken?.name,
            tier: 'Premium',
            roles: decodedToken?.dhanman_roles || [],
            organization: {
              id: decodedToken.dhanman_organization.id,
              name: decodedToken.dhanman_organization.name,
              gstIn: decodedToken.dhanman_organization.gstIn,
              pan: decodedToken.dhanman_organization.pan,
              tan: decodedToken.dhanman_organization.tan,
              shortName: decodedToken.dhanman_organization.shortName,
            },
            company: {
              id: decodedToken.dhanman_company.id,
              organizationId: decodedToken.dhanman_company.id,
              name: decodedToken.dhanman_company.name,
              description: decodedToken.dhanman_company.description,
              phoneNumber: decodedToken.dhanman_company.phoneNumber,
              email: decodedToken.dhanman_company.email,
              addressLine: decodedToken.dhanman_company.addressLine,
              gstIn: decodedToken.dhanman_company.gstIn,
              isApartment: decodedToken.dhanman_company.isApartment,
            },
            unitIds: unitIds.unitIds,
          },
        },
      });
    } catch (error) {
      console.error('Error setting user state:', error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Check for tokens in SecureStore first, then fallback to AsyncStorage
        let token = await getTokenSecurely('userToken');
       console.log('Retrieved Token:', token);

        if (token) {

          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          console.log('Decoded Token:', decodedToken);
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp && decodedToken.exp > currentTime) {
            console.log('Token is valid, setting user state');
            await setUserState(decodedToken);
          } else {
            console.log('Token is expired, refreshing token');
            // Token is expired, refresh it
            await refreshToken();
          }
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch({ type: LOGOUT });
      }
    };

    initAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (phoneNumber: any, otpCode: any) => {
    try {
      const credentials = await auth0.auth.loginWithSMS({
        phoneNumber: phoneNumber,
        code: otpCode,
        realm: 'sms',
        scope: 'openid profile email offline_access read:current_user update:current_user_metadata',
        audience: 'dev-dhanman-api',
      });

      // Store tokens securely
      await storeTokenSecurely('userToken', credentials.accessToken);
      await storeTokenSecurely('idToken', credentials.idToken || credentials.accessToken);
      await storeTokenSecurely(
        'refreshToken',
        credentials.refreshToken ? credentials.refreshToken : ''
      );

      const decodedToken = jwtDecode<CustomJwtPayload>(credentials.accessToken);
      await setUserState(decodedToken);
    } catch (error) {
      throw new Error('Failed to log in. Please check the OTP and try again.');
    }
  };

  const loginWithCredentials = async (username: string, password: string) => {
    try {
      // Validate input
      if (!username || !password) {
        throw new Error('Username and password are required');
      }
      console.log('Auth0 username login attempt:', username);
      const credentials = await auth0.auth.passwordRealm({
        username,
        password,
        realm: 'dhanman-db', // This must match your Auth0 DB connection name
        scope: 'openid profile email offline_access read:current_user update:current_user_metadata',
        audience: 'dev-dhanman-api',
      });

      //Store tokens securely
      await storeTokenSecurely('userToken', credentials.accessToken);
      await storeTokenSecurely('idToken', credentials.idToken || credentials.accessToken);
      await storeTokenSecurely('refreshToken', credentials.refreshToken ?? '');
      console.log('credentials.refreshToken:', credentials.refreshToken);
      // Decode and set user state
      const decodedToken = jwtDecode<CustomJwtPayload>(credentials.accessToken);
      console.log('Decoded Token:', decodedToken);
      await setUserState(decodedToken);
    } catch (error: any) {
      console.error('Auth0 username login failed:', error);
      throw new Error('Invalid username or password');
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = await getTokenSecurely('refreshToken');
      console.log('Refreshing token with refreshToken:', refreshToken);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      const newCredentials = await auth0.auth.refreshToken({ refreshToken });

      // Store new tokens securely
      await storeTokenSecurely('userToken', newCredentials.accessToken || newCredentials.idToken);
      await storeTokenSecurely('idToken', newCredentials.idToken || newCredentials.accessToken);

      if (newCredentials.refreshToken) {
        await storeTokenSecurely('refreshToken', newCredentials.refreshToken);
      }

      const decodedToken = jwtDecode<CustomJwtPayload>(
        newCredentials.idToken || newCredentials.accessToken
      );
      await setUserState(decodedToken);
    } catch (error) {
      console.error('Failed to refresh token', error);
      dispatch({ type: LOGOUT });
    }
  };

  const logout = async () => {
    try {
      // Remove tokens from SecureStore
      await removeTokenSecurely('userToken');
      await removeTokenSecurely('idToken');
      await removeTokenSecurely('refreshToken');

      // Also clean up any old AsyncStorage tokens
      // await AsyncStorage.removeItem('userToken');
      // await AsyncStorage.removeItem('refreshToken');

      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        loginWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
