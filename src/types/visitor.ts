export interface Visitor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  visitingFrom: string;
  contactNumber: string;
  visitorTypeId: number;
  visitorType: string;
  vehicleNumber: string;
  identityTypeId: number;
  identityNumber: string;
  createdBy: string;
  createdOnUtc: string;
  modifiedBy: string;
  modifiedOnUtc: string;
}

export interface VisitorType {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface VisitorIdentityType {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface VisitorTypesResponse {
  cursor?: string;
  items: VisitorType[];
}

export interface VisitorIdentityTypesResponse {
  cursor?: string;
  items: VisitorIdentityType[];
}

export interface VisitorsResponse {
  cursor?: string;
  items: Visitor[];
}