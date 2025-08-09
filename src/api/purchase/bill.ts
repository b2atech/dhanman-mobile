import { fetcher, fetcherPost, fetcherPut } from '../../utils/axiosPurchase';
import * as _ from 'lodash';
import Logger from '../../utils/logger';
import {
  Bill,
  BillsResponse,
  SendForApprovalRequest,
  ApproveBillRequest,
  CancelBillRequest,
  RejectBillRequest,
  FinancialYear,
} from '../../types/bill';

export const endpoints = {
  getAllBillsByCompanyId:
    'v1/companies/{0}/bills/{1}/finYear/{2}?startDate={3}&endDate={4}',
  sendForApproval: 'v1/bills/send-for-approval',
  cancelBill: 'v1/bills/cancel',
  approveBill: 'v1/bills/approve',
  rejectBill: 'v1/bills/reject',
};

export function getFinancialYearDates(finYearId: string | number): FinancialYear {
  const year = parseInt(String(finYearId), 10);
  return {
    id: year,
    startDate: new Date(year, 3, 1),
    endDate: new Date(year + 1, 2, 31),
  };
}

export const getAllBills = async (
  companyId: string | number,
  billTypeId: string | number,
  finYearId: string | number,
  startDate: string,
  endDate: string
): Promise<Bill[]> => {
  try {
    const url = endpoints.getAllBillsByCompanyId
      .replace('{0}', String(companyId))
      .replace('{1}', String(billTypeId))
      .replace('{2}', String(finYearId))
      .replace('{3}', startDate)
      .replace('{4}', endDate);

    Logger.apiCall('GET', url);
    Logger.debug('Fetching bills', { companyId, billTypeId, finYearId, startDate, endDate });

    const response: BillsResponse = await fetcher(url);
    Logger.debug('Bills fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching bills', error, { companyId, billTypeId, finYearId });
    throw error;
  }
};

export async function updateBillSendForApproval(
  sendForApprovalStatus: SendForApprovalRequest,
  finYearId: string | number,
  billTypeId: string | number
) {
  try {
    const safeData = _.cloneDeep(sendForApprovalStatus);
    Logger.apiCall('POST', endpoints.sendForApproval);
    Logger.debug('Sending bill for approval', { finYearId, billTypeId });

    const response = await fetcherPost(endpoints.sendForApproval, safeData);
    Logger.debug('Bill sent for approval successfully');
    return response;
  } catch (error) {
    Logger.error('Error sending bill for approval', error, { finYearId, billTypeId });
    throw error;
  }
}

export async function updateBillApprove(approveStatus: ApproveBillRequest, finYearId: string | number, billTypeId: string | number) {
  try {
    const safeData = _.cloneDeep(approveStatus);
    Logger.apiCall('POST', endpoints.approveBill);
    Logger.debug('Approving bill', { finYearId, billTypeId });

    const response = await fetcherPost(endpoints.approveBill, safeData);
    Logger.debug('Bill approved successfully');
    return response;
  } catch (error) {
    Logger.error('Error approving bill', error, { finYearId, billTypeId });
    throw error;
  }
}

export async function updateBillCancel(cancelStatus: CancelBillRequest, finYearId: string | number, billTypeId: string | number) {
  try {
    const safeData = _.cloneDeep(cancelStatus);
    Logger.apiCall('PUT', endpoints.cancelBill);
    Logger.debug('Cancelling bill', { finYearId, billTypeId });

    const response = await fetcherPut(endpoints.cancelBill, safeData);
    Logger.debug('Bill cancelled successfully');
    return response;
  } catch (error) {
    Logger.error('Error cancelling bill', error, { finYearId, billTypeId });
    throw error;
  }
}

export async function updateBillReject(rejectStatus: RejectBillRequest, finYearId: string | number, billTypeId: string | number) {
  try {
    const safeData = _.cloneDeep(rejectStatus);
    Logger.apiCall('PUT', endpoints.rejectBill);
    Logger.debug('Rejecting bill', { finYearId, billTypeId });

    const response = await fetcherPut(endpoints.rejectBill, safeData);
    Logger.debug('Bill rejected successfully');
    return response;
  } catch (error) {
    Logger.error('Error rejecting bill', error, { finYearId, billTypeId });
    throw error;
  }
}
