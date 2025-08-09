export interface Country {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

export interface State {
  id: number;
  name: string;
  code: string;
  countryId: number;
  country?: string;
  isActive: boolean;
}

export interface City {
  id: number;
  name: string;
  stateId: number;
  state?: string;
  countryId: number;
  country?: string;
  isActive: boolean;
}

export interface Address {
  id: number;
  addressLine1: string;
  addressLine2?: string;
  cityId: number;
  city?: string;
  stateId: number;
  state?: string;
  countryId: number;
  country?: string;
  pinCode: string;
  latitude?: number;
  longitude?: number;
  addressType?: string;
  isDefault?: boolean;
  createdBy?: string;
  createdOnUtc?: string;
  modifiedBy?: string;
  modifiedOnUtc?: string;
}

export interface CountriesResponse {
  cursor?: string;
  items: Country[];
}

export interface StatesResponse {
  cursor?: string;
  items: State[];
}

export interface CitiesResponse {
  cursor?: string;
  items: City[];
}

export interface AddressesResponse {
  cursor?: string;
  items: Address[];
}