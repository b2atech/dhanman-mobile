import React, {useEffect, useState} from 'react';
import Logger from '../utils/logger';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Logger from '../utils/logger';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Logger from '../utils/logger';
import {faPhone, faEnvelope} from '@fortawesome/free-regular-svg-icons';
import Logger from '../utils/logger';
import commonStyles from '../../commonStyles/commonStyles';
import Logger from '../utils/logger';
import {getVisitorsByUnitId} from '../../api/myHome/visitorLog';
import Logger from '../utils/logger';
import defaultUserIcon from '../../assets/images/user_icon.png';
import Logger from '../utils/logger';

const UnitVisitorsScreen = ({route}) => {
  const {unitId, unitName} = route.params;
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const apartmentId = '12fb50f0-9998-456f-8aee-bb83ab2fbbdb';
        const visitorsData = await getVisitorsByUnitId(apartmentId, unitId);
        setVisitors(visitorsData);
      } catch (error) {
        Logger.error('Error fetching visitors by unit', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, [unitId]);

  return (
    <View style={commonStyles.container}>
      {!loading && (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[commonStyles.headerBoldText, styles.title]}>
            Visitors for {unitName}
          </Text>
          {visitors.map((visitor, index) => (
            <View key={index} style={styles.visitorCard}>
              <Image
                source={visitor.image ? {uri: visitor.image} : defaultUserIcon}
                style={styles.visitorImage}
              />
              <View style={styles.visitorInfo}>
                <Text style={commonStyles.headerText}>
                  {visitor.visitorName}
                </Text>
                <Text style={commonStyles.descriptionText}>
                  {visitor.serviceProviderSubTypeName}
                </Text>
                <View style={styles.iconRow}>
                  <FontAwesomeIcon
                    icon={faPhone}
                    size={18}
                    style={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={18}
                    style={styles.icon}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginBottom: 20,
  },
  visitorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  visitorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  visitorInfo: {
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
    color: '#007BFF',
  },
});

export default UnitVisitorsScreen;
