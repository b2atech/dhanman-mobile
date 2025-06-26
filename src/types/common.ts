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