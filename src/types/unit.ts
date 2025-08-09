export interface Unit {
  id: number;
  name: string;
  unitNumber?: string;
  apartmentId: number;
  buildingId: number;
  floorId: number;
  unitTypeId?: number;
  unitType?: string;
  area?: number;
  status?: string;
  createdBy?: string;
  createdOnUtc?: string;
  modifiedBy?: string;
  modifiedOnUtc?: string;
}

export interface UnitName {
  id: number;
  name: string;
  unitNumber: string;
}

export interface UnitsResponse {
  cursor?: string;
  items: Unit[];
}

export interface UnitNamesResponse {
  cursor?: string;
  items: UnitName[];
}

export interface UserUnitsResponse {
  cursor?: string;
  items: string[];
}