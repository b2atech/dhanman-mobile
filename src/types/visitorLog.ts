export interface VisitorLog {
  id: number;
  apartmentId: number;
  visitorId: number;
  visitor?: {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email?: string;
    visitorType?: string;
    vehicleNumber?: string;
  };
  unitId: number;
  unit?: {
    name: string;
    unitNumber: string;
  };
  purpose: string;
  checkInTime: string;
  checkOutTime?: string;
  isPreApproved: boolean;
  approvedBy?: string;
  approvedOnUtc?: string;
  rejectedBy?: string;
  rejectedOnUtc?: string;
  rejectionReason?: string;
  status: string;
  statusId: number;
  createdBy: string;
  createdOnUtc: string;
  modifiedBy?: string;
  modifiedOnUtc?: string;
  latestEntryTime?: string;
  latestExitTime?: string;
  expectedArrival?: string;
  visitorTypeName?: string;
  unitName?: string;
}

export interface VisitorLogsByUnitResponse {
  cursor?: string;
  items: VisitorLog[];
}

export interface VisitorLogsResponse {
  cursor?: string;
  items: VisitorLog[];
}

export interface CreateVisitorLogRequest {
  apartmentId: number;
  visitorId: number;
  unitId: number;
  purpose: string;
  isPreApproved?: boolean;
}

export interface VisitorLogStatusUpdate {
  visitorLogId: number;
  reason?: string;
}

export interface PreApprovedVisitorRequest {
  apartmentId: number;
  visitorId: number;
  unitId: number;
  validFrom: string;
  validTo: string;
  purpose: string;
  approvedBy: string;
}