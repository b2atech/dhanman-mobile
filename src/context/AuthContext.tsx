import React, { createContext, useEffect, useReducer, useState } from "react";
import Auth0 from "react-native-auth0";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "../context/auth-reducer/auth";
import { Auth0ContextType } from "../types/auth";
import { LOGOUT, LOGIN } from "./auth-reducer/actions";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { getUnitsByUserId } from "../api/myHome/unit";

interface CustomJwtPayload extends JwtPayload {
  dhanman_id: string;
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
  domain: "dev-dhanman.us.auth0.com",
  clientId: "fp21qh7VmYAuseleceLieieYoARKMzky",
});

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: null,
  });

  const setUserState = async (decodedToken: CustomJwtPayload) => {
    console.log("decode : ", decodedToken);
    if (!decodedToken.dhanman_id || !decodedToken.dhanman_company.id) return;
    {
      const unitIds = await getUnitsByUserId(
        decodedToken.dhanman_company.id,
        decodedToken.dhanman_id
      );

      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            id: decodedToken?.sub?.split("|")?.[1],
            dhanmanId: decodedToken?.dhanman_id,
            avatar: decodedToken?.picture,
            name: decodedToken?.name,
            tier: "Premium",
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
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (token) {
          const decodedToken = jwtDecode<CustomJwtPayload>(token);
          const currentTime = Math.floor(Date.now() / 1000);
          console.log(
            "Checking Decode Token",
            decodedToken.exp && decodedToken.exp > currentTime
          );
          if (decodedToken.exp && decodedToken.exp > currentTime) {
            setUserState(decodedToken);
          } else {
            // Token is expired, refresh it
            await refreshToken();
          }
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({ type: LOGOUT });
      }
    };

    initAuth();
  }, []);

  const login = async (phoneNumber: any, otpCode: any) => {
    try {
      const credentials = await auth0.auth.loginWithSMS({
        phoneNumber: phoneNumber,
        code: otpCode,
        realm: "sms",
        scope:
          "openid profile email offline_access read:current_user update:current_user_metadata",
        audience: "dev-dhanman-api",
      });
      console.log(credentials);
      await AsyncStorage.setItem("userToken", credentials.accessToken);
      await AsyncStorage.setItem(
        "refreshToken",
        credentials.refreshToken ? credentials.refreshToken : ""
      );
      const decodedToken = jwtDecode<CustomJwtPayload>(credentials.accessToken);
      setUserState(decodedToken);
    } catch (error) {
      throw new Error("Failed to log in. Please check the OTP and try again.");
    }
  };

  const loginWithCredentials = async (username: string, password: string) => {
    try {
      const credentials = await auth0.auth.passwordRealm({
        username,
        password,
        realm: "dhanman-db", // This must match your Auth0 DB connection name
        scope:
          "openid profile email offline_access read:current_user update:current_user_metadata",
        audience: "dev-dhanman-api",
      });

      // Store tokens securely
      await AsyncStorage.setItem("userToken", credentials.accessToken);
      await AsyncStorage.setItem(
        "refreshToken",
        credentials.refreshToken ?? ""
      );

      // Decode and set user state
      const decodedToken = jwtDecode<CustomJwtPayload>(credentials.accessToken);
      await setUserState(decodedToken);
    } catch (error: any) {
      console.error("Auth0 username login failed:", error);
      throw new Error("Invalid username or password");
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log("ref", refreshToken);
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      const newCredentials = await auth0.auth.refreshToken({ refreshToken });

      await AsyncStorage.setItem("userToken", newCredentials.idToken);

      if (newCredentials.refreshToken) {
        await AsyncStorage.setItem("refreshToken", newCredentials.refreshToken);
      }

      const decodedToken = jwtDecode<CustomJwtPayload>(newCredentials.idToken);
      setUserState(decodedToken);
    } catch (error) {
      console.error("Failed to refresh token", error);
      dispatch({ type: LOGOUT });
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("refreshToken");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error logging out:", error);
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
