import { Dispatch } from "react";

export type IUser = {
    id?: string;
    dhanmanId?: string;
    email?: string;
    avatar?: string;
    image?: string;
    name?: string;
    roles?: string[];
    tier?: string;
    organization?: IOrganization;
    company?: ICompany;
    unitIds?: string[];
  };
  export interface ICompany {
    id: string;
    organizationId: string;
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    addressLine: string;
    gstIn: string;
    isApartment: boolean;
  }

  export interface IOrganization {
    id: string;
    name: string;
    gstIn: string;
    pan: string;
    tan: string;
    shortName: string;
  }
  export interface AuthProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: IUser | null;
    token?: string | null;
  }

  export interface AuthActionProps {
    type: string;
    payload?: AuthProps;
  }
  
  export type Auth0ContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: IUser | null ;
    logout: () => void;
    login: (phoneNumber: string, otpCode: string) => Promise<void>;
    loginWithCredentials?: (username: string, password: string) => Promise<void>;
    resetPassword?: (email: string) => Promise<void>;
    updateProfile?: Function;
    dispatch?: Dispatch<AuthActionProps>;
  };