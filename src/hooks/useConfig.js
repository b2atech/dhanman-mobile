// Types

import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

// ==============================|| THEME CONFIG ||============================== //
const useConfig = () => {
  const {user} = useContext(AuthContext);
  console.log('useConfig user', user);
  return {
    fontFamily: `'Public Sans', sans-serif`,
    i18n: 'en',
    miniDrawer: false,
    container: true,
    presetColor: 'default',
    organization: user?.dhanman_organization,
    company: {
    "description": "Apartment MyHome ",
    "gstIn": "22AAAAA0000A1Z5",
    "id": "12fb50f0-9998-456f-8aee-bb83ab2fbbdb",
    "isApartment": true,
    "name": "Aspen Woods Apartment",
    "organizationId": "37437e17-c0e2-4e97-8167-121b854fe90b"
  },
    //company: user?.dhanman_company,
    roles: user?.dhanman_roles || [],
    unitIds: user?.unitIds,
    finYear: {id: 2023, name: '2023'},
  };
};

export default useConfig;
