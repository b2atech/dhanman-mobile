import { fetcher } from "../../utils/axiosPurchase";

export const endpoints = {
  getAllBillsByCompanyId: "v1/companies/{0}/",
  getdefalutors: "v1/companies/{0}/defaultors",
};
export const getdefalutors = async (apartmentId) => {
  try {
    const url = endpoints.getdefalutors.replace("{0}", apartmentId);
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error("Error fetching defaultors", error);
    throw error;
  }
};
