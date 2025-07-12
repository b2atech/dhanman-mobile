import { fetcher } from "../../utils/axiosCommunity";

export const endpoints = {
  getFloorNamesByAptId: "v1/apartments/{0}/buildings/{1}/floor-names",
};
export const getFloorName = async (apartmentId, buildingId) => {
  try {
    const url = endpoints.getFloorNamesByAptId
      .replace("{0}", apartmentId)
      .replace("{1}", buildingId.toString());
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error("Error fetching events", error);
    throw error;
  }
};
