import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import commonStyles from '../../commonStyles/commonStyles';
import FinanceHome from '../dashboard/FinanceHome';
import { AuthContext } from '../../context/AuthContext';
import useConfig from '../../hooks/useConfig';
import { useHasPermission } from '../../hooks/useHasPermission';
import { DhanmanPermissions } from '../../constant/DhanmanPermission';

import HeaderComponent from '../HeaderScreen';
import { getdefalutors, getdefalutorTotal } from '../../api/sales/defaultor';
import BillSection from './Components/BillSection';
import { getAllBills } from '../../api/purchase/bill';
import Logger from '../../utils/logger';
import { Bill } from '../../types/bill';
import FloatingActionButton from '../../components/shared/AddButton';

interface HomeScreenProps {
  navigation: any;
  fcmToken?: string;
}

const HomeScreen = ({ navigation, fcmToken }: HomeScreenProps) => {
  const authContext = useContext(AuthContext);
  const config = useConfig();
  const units = authContext?.user?.unitIds || [];
  const { hasPermission, loading } = useHasPermission(
    config?.organization?.id,
    authContext?.user?.dhanmanId,
    DhanmanPermissions.ADMIN
  );
  const [defalutorTotal, setDefalutorTotal] = useState<any[]>([]);
  const [defalutors, setDefalutors] = useState<any[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string | number>(
    units.length > 0 ? units[0] : ''
  );

  useEffect(() => {
    let isMounted = true;
    if (units.length > 0 && !selectedUnit && isMounted) {
      setSelectedUnit(units[0]);
    }
    return () => {
      isMounted = false;
    };
  }, [units, selectedUnit]);

  useEffect(() => {
    let isMounted = true;

    const fetchTotalAmounts = async () => {
      try {
        const response = await getdefalutorTotal(
          '12fb50f0-9998-456f-8aee-bb83ab2fbbdb'
        ); //config.company.id);
        if (isMounted) {
          setDefalutorTotal(response);
        }
      } catch (err) {
        Logger.error('Error fetching total amount for defaulter');
      }
    };

    fetchTotalAmounts();

    return () => {
      isMounted = false;
    };
  }, [config.company.id]);

  useEffect(() => {
    let isMounted = true;

    const fetchDefaulters = async () => {
      try {
        const response = await getdefalutors(config.company.id);
        if (isMounted) {
          setDefalutors(response);
        }
      } catch (err) {
        Logger.error('Error fetching defaulters', err);
      }
    };

    fetchDefaulters();

    return () => {
      isMounted = false;
    };
  }, [config.company.id]);

  const [bills, setBills] = useState<Bill[]>([]);
  const startDate = '2025-01-01';
  const endDate = '2025-12-31';

  useEffect(() => {
    let isMounted = true;

    const fetchBills = async () => {
      try {
        const fetchedBills = await getAllBills(
          config.company.id,
          2,
          config.finYear.id,
          // finYearId,
          startDate,
          endDate
        );
        if (isMounted) {
          setBills(fetchedBills);
        }
      } catch (err) {
        Logger.error('Error fetching bills', err);
      }
    };

    fetchBills();

    return () => {
      isMounted = false;
    };
  }, [config.company.id, startDate, endDate]);

  return (
    <View style={styles.container}>
      <ScrollView style={commonStyles.container}>
        {authContext?.user && (
          <HeaderComponent
            user={authContext.user}
            companyName={config?.company?.name}
            units={
              units.length > 0
                ? units.map((unit) => ({ id: String(unit), name: `Unit ${unit}` }))
                : []
            }
            selectedUnit={'A-511'}
            setSelectedUnit={setSelectedUnit}
          />
        )}

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Pending Dues</Text>
          <Text style={styles.balanceAmount}>₹1,000.00</Text>
          <View style={styles.buttonRow}>
            <View style={styles.singleButtonContainer}>
              <Button
                title="Pay Now"
                buttonStyle={styles.topUpButton}
                onPress={() => navigation.navigate('PaymentScreen')}
              />
            </View>
            <View style={styles.singleButtonContainer}>
              <Button
                title="Details"
                buttonStyle={styles.topUpButton}
                onPress={() => navigation.navigate('PaymentDetailScreen')}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cardContainer}
          onPress={() =>
            navigation.navigate('Defaulter Screen', { list: defalutors })
          }
        >
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>Defaultor List</Text>
          </View>
          <View style={styles.cardRight}>
            <Text style={styles.cardCount}>
              {defalutorTotal[0].totalDefaultors}
            </Text>
            <Text style={styles.cardTotalAmount}>
              ₹ {defalutorTotal[0].totalAmount}
            </Text>
          </View>
        </TouchableOpacity>

        <BillSection
          bills={bills}
          navigation={navigation}
          billType={2}
          company={config.company}
          finYearId={config.finYear.id}
        />
        {!loading && hasPermission && <FinanceHome />}
      </ScrollView>

      <FloatingActionButton  />
    </View>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fcmToken: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  balanceContainer: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  balanceText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    fontWeight: '500',
  },

  balanceAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  topUpButton: {
    backgroundColor: '#3B6FD6',
    borderRadius: 25,
    paddingVertical: 12,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#3B6FD6',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardCount: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  cardTotalAmount: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  singleButtonContainer: {
    flex: 1,
  },
});

export default HomeScreen;
