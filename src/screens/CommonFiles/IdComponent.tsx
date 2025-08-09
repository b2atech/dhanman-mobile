import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import commonStyles from '../../commonStyles/commonStyles';

const IdComponent = ({
  label,
  addNew,
  navigate,
  code,
  handleCodeChange,
  loading,
  items,
  handlePushNotification,
  error,
  maxLength,
  emptyListMessage,
  id,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[commonStyles.container, styles.container]}>
      <Text style={commonStyles.headerBoldText}>{label}</Text>
      <TextInput
        style={commonStyles.input}
        value={code}
        onChangeText={handleCodeChange}
        keyboardType="numeric"
        maxLength={maxLength}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>First Name:</Text>
              <Text style={styles.itemValue}>{item.firstName}</Text>
              <Text style={styles.itemLabel}>Last Name:</Text>
              <Text style={styles.itemValue}>{item.lastName}</Text>
              <Text style={styles.itemLabel}>Email:</Text>
              <Text style={styles.itemValue}>{item.email}</Text>
              <Text style={styles.itemLabel}>Visiting From:</Text>
              <Text style={styles.itemValue}>{item.visitingFrom}</Text>
              <Text style={styles.itemLabel}>Contact Number:</Text>
              <Text style={styles.itemValue}>{item.contactNumber}</Text>
              <Text style={styles.itemLabel}>Vehicle Number:</Text>
              <Text style={styles.itemValue}>{item.vehicleNumber}</Text>
              <Text style={styles.itemLabel}>Identity Number:</Text>
              <Text style={styles.itemValue}>{item.identityNumber}</Text>
              <TouchableOpacity
                style={styles.pushButton}
                onPress={() => handlePushNotification(item)}>
                <Text style={styles.pushButtonText}>Notify unit member</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>{emptyListMessage}</Text>
          }
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(navigate)}>
        <Text style={styles.addButtonText}>Add New {addNew}</Text>
      </TouchableOpacity>
    </View>
  );
};

IdComponent.propTypes = {
  label: PropTypes.string.isRequired,
  addNew: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  handleCodeChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      visitingFrom: PropTypes.string,
      contactNumber: PropTypes.string,
      vehicleNumber: PropTypes.string,
      identityNumber: PropTypes.string,
    }),
  ).isRequired,
  handlePushNotification: PropTypes.func.isRequired,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  emptyListMessage: PropTypes.string.isRequired,
};

IdComponent.defaultProps = {
  error: null,
  maxLength: 2,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Apply Poppins font
  },
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins-ExtraLight', // Apply Poppins font
  },
  itemValue: {
    fontSize: 14,
    marginBottom: 15,
    color: '#555',
    fontFamily: 'Poppins-ExtraLight', // Apply Poppins font
  },
  pushButton: {
    backgroundColor: '#1ab394',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  pushButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Apply Poppins font
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular', // Apply Poppins font
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontFamily: 'Poppins-Regular', // Apply Poppins font
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Apply Poppins font
  },
});

export default IdComponent;
