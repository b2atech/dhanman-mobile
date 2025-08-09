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

export interface VisitorsResponse {
  cursor: string;
  items: Visitor[];
}