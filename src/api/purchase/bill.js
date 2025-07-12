import { fetcher, fetcherPost } from "../../utils/axiosPurchase";

export const endpoints = {
  getAllBillsByCompanyId:
    "v1/companies/{0}/bills/{1}/finYear/{2}?startDate={3}&endDate={4}",
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

export async function updateBillApprove(
  approveInvoiceStatus,
  finYearId,
  billTypeId
) {
  try {
    const { startDate, endDate } = getFinancialYearDates(finYearId);
    const companyId = approveInvoiceStatus.companyId;

    await fetcherPost([endpoints.approveBill, { data: approveInvoiceStatus }]);

    const url = endpoints.getAllBillsByCompanyId
      .replace("{0}", companyId)
      .replace("{1}", String(billTypeId))
      .replace("{2}", String(finYearId))
      .replace("{3}", formatDate(startDate))
      .replace("{4}", formatDate(endDate));

    const response = await fetcher(url);
    console.log("APIResponse", response);
    return response.items;
  } catch (error) {
    console.error("Error approving or fetching bills", error);
    throw error;
  }
}
