import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ICompany, IOrganization, IFinYear } from '../types/common';
import Logger from '../utils/logger';

interface ConfigReturn {
  fontFamily: string;
  i18n: string;
  miniDrawer: boolean;
  container: boolean;
  presetColor: string;
  organization?: IOrganization;
  company: ICompany;
  roles: string[];
  unitIds?: string[];
  finYear: IFinYear;
}

// ==============================|| THEME CONFIG ||============================== //
const useConfig = (): ConfigReturn => {
  const authContext  = useContext(AuthContext);
  Logger.debug('useConfig user retrieved', { userId: authContext?.user?.id, email: authContext?.user?.email });

  return {
    fontFamily: '\'Public Sans\', sans-serif',
    i18n: 'en',
    miniDrawer: false,
    container: true,
    presetColor: 'default',
    organization: authContext?.user?.organization,
    company: {
      description: 'Apartment MyHome ',
      gstIn: '22AAAAA0000A1Z5',
      id: '12fb50f0-9998-456f-8aee-bb83ab2fbbdb',
      isApartment: true,
      name: 'Aspen Woods Apartment',
      organizationId: '37437e17-c0e2-4e97-8167-121b854fe90b',
      phoneNumber: '',
      email: '',
      addressLine: '',
    },
    //company: user?.dhanman_company,
    roles: authContext?.user?.roles || [],
    unitIds: authContext?.user?.unitIds,
    finYear: { id: 2025, name: '2025' },
  };
};

export default useConfig;
