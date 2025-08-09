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

  export interface IFinYear {
    id: number;
    name: string;
  }

  export interface IOrganization {
    id: string;
    organizationId: string;
    name: string;
    gstIn: string;
    pan: string;
    tan: string;
    shortName: string;
  }

  export interface IPermission {
    id: string;
    name: string;
    parentPermissionId?: string;
  }

  export interface IUserPermission {
    permissionId: string;
    userId: string;
    organizationId: string;
  }

  export interface IUnit {
    id: string;
    name: string;
  }

  export interface PermissionHookReturn {
    hasPermission: boolean;
    loading: boolean;
  }

  export type RootStackParamList = {
  DeliveryApproval: {
    deliveryManName: string;
    selectedCompany: string | null;
  };
  CreateServiceProvider: undefined; // or specify params if needed
  CreateVisitors: undefined; // Add this line

  // ...other routes
  };
