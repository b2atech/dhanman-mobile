export interface User {
  id: number;
  dhanmanId: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  isActive: boolean;
  userType?: string;
  userTypeId?: number;
  organizationId?: number;
  organization?: string;
  apartmentId?: number;
  apartment?: string;
  unitIds?: number[];
  units?: Array<{
    id: number;
    name: string;
    unitNumber: string;
  }>;
  roles?: Array<{
    id: number;
    name: string;
    permissions: string[];
  }>;
  profileImageUrl?: string;
  lastLoginUtc?: string;
  createdBy?: string;
  createdOnUtc: string;
  modifiedBy?: string;
  modifiedOnUtc?: string;
}

export interface UsersResponse {
  cursor?: string;
  items: User[];
}

export interface UserRole {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
}

export interface UserPermission {
  id: number;
  name: string;
  resource: string;
  action: string;
}