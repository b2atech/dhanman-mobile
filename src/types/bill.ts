export interface Bill {
  id: number;
  companyId: number;
  billTypeId: number;
  billType?: string;
  finYearId: number;
  billNumber: string;
  billDate: string;
  dueDate?: string;
  amount: number;
  paidAmount?: number;
  balanceAmount?: number;
  status: string;
  statusId: number;
  description?: string;
  vendorId?: number;
  vendorName?: string;
  approvedBy?: string;
  approvedOnUtc?: string;
  rejectedBy?: string;
  rejectedOnUtc?: string;
  rejectionReason?: string;
  cancelledBy?: string;
  cancelledOnUtc?: string;
  cancellationReason?: string;
  createdBy: string;
  createdOnUtc: string;
  modifiedBy?: string;
  modifiedOnUtc?: string;
}

export interface BillsResponse {
  cursor?: string;
  items: Bill[];
}

export interface BillStatusUpdate {
  billIds: number[];
  reason?: string;
  comments?: string;
}

export interface SendForApprovalRequest extends BillStatusUpdate {}
export interface ApproveBillRequest extends BillStatusUpdate {}
export interface RejectBillRequest extends BillStatusUpdate {
  reason: string;
}
export interface CancelBillRequest extends BillStatusUpdate {
  reason: string;
}

export interface FinancialYear {
  id: number;
  startDate: Date;
  endDate: Date;
}