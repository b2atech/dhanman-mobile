import {fetcher} from '../../utils/axiosCommunity';

export const endpoints = {
  getBuildingNameByAptId: 'v1/apartments/{0}/building-names',
};

export const getBuildingNames = async apartmentId => {
  try {
    const url = endpoints.getBuildingNameByAptId.replace('{0}', apartmentId);

    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching buildings', error);
    throw error;
  }
};
