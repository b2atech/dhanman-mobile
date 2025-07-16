import { fetcher, fetcherPost } from "../../utils/axiosPurchase";
import cloneDeep from "lodash/cloneDeep";

export const endpoints = {
  getAllBillsByCompanyId:
    "v1/companies/{0}/bills/{1}/finYear/{2}?startDate={3}&endDate={4}",
  sendForApproval: "v1/bill-statuses/sending-for-approval",
  firstLevelApproval: "v1/bill-statuses/approve-level1",
  secondLevelApproval: "v1/bill-statuses/approve-level2",
  cancelBill: "v1/bill-statuses/cancel",
  approveBill: "v1/bill-statuses/approve",
};

export const getAllBills = async (
  companyId,
  billTypeId,
  finYearId,
  startDate,
  endDate
) => {
  try {
    const url = endpoints.getAllBillsByCompanyId
      .replace("{0}", companyId)
      .replace("{1}", String(billTypeId))
      .replace("{2}", String(finYearId))
      .replace("{3}", startDate)
      .replace("{4}", endDate);
    const response = await fetcher(url);
    console.log("APIResponse", response);
    return response.items;
  } catch (error) {
    console.error("Error fetching bills", error);
    throw error;
  }
};

function getFinancialYearDates(finYearId) {
  const startDate = new Date(finYearId, 3, 1);
  const endDate = new Date(finYearId + 1, 2, 31);
  return { startDate, endDate };
}

export async function updateBillSendForApproval(
  sendForApprovalStatus,
  finYearId,
  billTypeId,
  startDate,
  endDate
) {
  const swrKey =
    startDate && endDate && billTypeId
      ? endpoints.getAllBillsByCompanyId
          .replace("{0}", sendForApprovalStatus.companyId)
          .replace("{1}", billTypeId.toString())
          .replace("{2}", finYearId.toString())
          .replace("{3}", formatDate(startDate))
          .replace("{4}", formatDate(endDate))
      : null;

  const safeSendForApprovalStatus = cloneDeep(sendForApprovalStatus);

  const response = await fetcherPost([
    endpoints.sendForApproval,
    { data: safeSendForApprovalStatus },
  ]);

  const updateBillStatus = (currentStatus) => ({
    ...currentStatus,
    status:
      currentStatus?.status?.map((status) =>
        status.billIds === sendForApprovalStatus.billIds
          ? { ...status, ...sendForApprovalStatus }
          : status
      ) || [],
  });

  await Promise.all([
    mutate(endpoints.sendForApproval + endpoints.list, updateBillStatus, false),
    mutate(swrKey, undefined, true),
  ]);

  return response;
}

export async function updateBillApproveLevel1(
  approveBillStatus,
  finYearId,
  billTypeId
) {
  const { startDate, endDate } = getFinancialYearDates(config.finYear.id);

  const swrKey =
    startDate && endDate
      ? endpoints.getAllBillsByCompanyId
          .replace("{0}", approveBillStatus.companyId)
          .replace("{1}", billTypeId.toString())
          .replace("{2}", finYearId.toString())
          .replace("{3}", formatDate(startDate))
          .replace("{4}", formatDate(endDate))
      : null;

  const safeApproveBillStatus = cloneDeep(approveBillStatus);

  const response = await fetcherPost([
    endpoints.firstLevelApproval,
    { data: safeApproveBillStatus },
  ]);

  mutate(
    endpoints.approveBill + endpoints.list,
    (currentStatus) => {
      const newStatus = (currentStatus?.status || []).map((status) =>
        status.billIds === approveBillStatus.billIds
          ? { ...status, ...approveBillStatus }
          : status
      );

      return {
        ...currentStatus,
        status: newStatus,
      };
    },
    false
  );

  mutate(swrKey, undefined, true);

  return response;
}

export async function updateBillApproveLevel2(
  approveBillStatus,
  finYearId,
  billTypeId
) {
  const { startDate, endDate } = getFinancialYearDates(config.finYear.id);

  const swrKey =
    startDate && endDate
      ? endpoints.getAllBillsByCompanyId
          .replace("{0}", approveBillStatus.companyId)
          .replace("{1}", billTypeId.toString())
          .replace("{2}", finYearId.toString())
          .replace("{3}", formatDate(startDate))
          .replace("{4}", formatDate(endDate))
      : null;

  const safeApproveBillStatus = cloneDeep(approveBillStatus);
  const response = await fetcherPost([
    endpoints.secondLevelApproval,
    { data: safeApproveBillStatus },
  ]);

  mutate(
    endpoints.approveBill + endpoints.list,
    (currentStatus) => {
      const newStatus = (currentStatus?.status || []).map((status) =>
        status.billIds === approveBillStatus.billIds
          ? { ...status, ...approveBillStatus }
          : status
      );

      return {
        ...currentStatus,
        status: newStatus,
      };
    },
    false
  );

  mutate(swrKey, undefined, true);

  return response;
}

export async function updateBillApprove(
  approveInvoiceStatus,
  finYearId,
  billTypeId
) {
  const { startDate, endDate } = getFinancialYearDates(config.finYear.id);

  const swrKey =
    startDate && endDate
      ? endpoints.getAllBillsByCompanyId
          .replace("{0}", approveInvoiceStatus.companyId)
          .replace("{1}", billTypeId.toString())
          .replace("{2}", finYearId.toString())
          .replace("{3}", formatDate(startDate))
          .replace("{4}", formatDate(endDate))
      : null;

  const safeApproveInvoiceStatus = cloneDeep(approveInvoiceStatus);

  const response = await fetcherPost([
    endpoints.approveBill,
    { data: safeApproveInvoiceStatus },
  ]);

  mutate(
    endpoints.approveBill + endpoints.list,
    (currentStatus) => {
      const newStatus = (currentStatus?.status || []).map((status) =>
        status.billIds === approveInvoiceStatus.billIds
          ? { ...status, ...approveInvoiceStatus }
          : status
      );

      return {
        ...currentStatus,
        status: newStatus,
      };
    },
    false
  );

  mutate(swrKey, undefined, true);

  return response;
}
