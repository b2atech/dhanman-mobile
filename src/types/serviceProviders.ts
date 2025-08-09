export interface ServiceProvider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  visitingFrom: string;
  contactNumber: string;
  prermanentAddressId: string;
  presentAddressId: string;
  serviceProviderTypeId: number;
  serviceProviderType: string;
  serviceProviderSubTypeId: number;
  serviceProviderSubType: string;
  vehicleNumber: string;
  identityTypeId: number;
  identityNumber: string;
  pin: string;
  createdBy: string;
  createdOnUtc: string;
  modifiedBy: string;
  modifiedOnUtc: string;
}

export interface ServiceProvidersResponse {
  cursor: string;
  items: ServiceProvider[];
