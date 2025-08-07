import { fetcher, fetcherPost, fetcherPut } from '../../utils/axiosPurchase';
import cloneDeep from 'lodash/cloneDeep';

export const endpoints = {
  getAllBillsByCompanyId:
    'v1/companies/{0}/bills/{1}/finYear/{2}?startDate={3}&endDate={4}',
  sendForApproval: 'v1/bills/send-for-approval',
  cancelBill: 'v1/bills/cancel',
  approveBill: 'v1/bills/approve',
  rejectBill: 'v1/bills/reject',
};

export function getFinancialYearDates(finYearId) {
  const year = parseInt(finYearId);
  return {
    startDate: new Date(year, 3, 1),
    endDate: new Date(year + 1, 2, 31),
  };
}

export const getAllBills = async (
  companyId,
  billTypeId,
  finYearId,
  startDate,
  endDate
) => {
  try {
    const url = endpoints.getAllBillsByCompanyId
      .replace('{0}', companyId)
      .replace('{1}', String(billTypeId))
      .replace('{2}', String(finYearId))
      .replace('{3}', startDate)
      .replace('{4}', endDate);
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching bills', error);
    throw error;
  }
};

export async function updateBillSendForApproval(
  sendForApprovalStatus,
  finYearId,
  billTypeId
) {
  const safeData = cloneDeep(sendForApprovalStatus);

  const response = await fetcherPost(endpoints.sendForApproval, safeData);

  return response;
}

export async function updateBillApprove(approveStatus, finYearId, billTypeId) {
  const safeData = cloneDeep(approveStatus);

  const response = await fetcherPost(endpoints.approveBill, safeData);

  return response;
}

export async function updateBillCancel(cancelStatus, finYearId, billTypeId) {
  const safeData = cloneDeep(cancelStatus);

  const response = await fetcherPut(endpoints.cancelBill, safeData);

  return response;
}

export async function updateBillReject(rejectStatus, finYearId, billTypeId) {
  const safeData = cloneDeep(rejectStatus);

  const response = await fetcherPut(endpoints.rejectBill, safeData);

  return response;
}
