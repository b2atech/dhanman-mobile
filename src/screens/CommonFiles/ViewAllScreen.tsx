import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope, faStar} from '@fortawesome/free-regular-svg-icons';
import defaultUserIcon from '../../assets/images/user_icon.png';
import commonStyles from '../../commonStyles/commonStyles';

const ViewAllScreen = ({route, navigation}) => {
  const {data} = route.params;

  const handlePress = visitor => {
    navigation.navigate('Visitor Detail', {visitor});
  };

  return (
    <View style={[commonStyles.container, styles.container]}>
      <Text style={[commonStyles.headerBoldText, styles.fontAwesomeText]}>
        All Visitors
      </Text>
      <ScrollView contentContainerStyle={styles.visitorsContainer}>
        {data.map((visitor, index) => (
          <TouchableOpacity
            key={index}
            style={styles.visitorCard}
            onPress={() => handlePress(visitor)}>
            <Image
              source={visitor.image ? {uri: visitor.image} : defaultUserIcon}
              style={styles.visitorImage}
            />
            <View style={styles.visitorInfo}>
              <Text style={[commonStyles.headerText, styles.fontAwesomeText]}>
                {visitor.firstName} {visitor.lastName}
              </Text>
              <Text
                style={[commonStyles.descriptionText, styles.fontAwesomeText]}>
                {visitor.contactNumber}
              </Text>
              <View style={styles.iconsContainer}>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={styles.icon}
                  color="#3B6FD6"
                />
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={styles.icon}
                  color="#3B6FD6"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  style={styles.icon}
                  color="#3B6FD6"
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  visitorsContainer: {
    flexGrow: 1,
  },
  visitorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  visitorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  visitorInfo: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default ViewAllScreen;
