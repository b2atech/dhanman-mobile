import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const commonStyles = StyleSheet.create({
  alignItemCenter: {
    alignItems: 'center',
  },
  alignItemLeft: {
    alignItems: 'flex-start',
  },
  alignItemRight: {
    alignItems: 'flex-end',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  headerText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Poppins-ExtraLight',
  },
  headerBoldText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'condensedBold',
    fontFamily: 'Poppins-ExtraLight',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  container: {
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#f7f7f7',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  dropdown: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,
  },
  placeholderStyle: {
    color: '#999',
  },
  selectedTextStyle: {
    color: '#000',
  },
  dropdownItemTextStyle: {
    color: '#000',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  rounded: {
    borderRadius: 15,
  },
  fontPoppins: {
    fontFamily: 'Poppins-Regular',
  },
  shareButton: {
    padding: 2,
  },
  addButton: {position: 'absolute', top: -1, right: -7},

  addCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  infoCircle: {
    width: 22,
    height: 22,
    borderRadius: 10,
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'right',
  },
  statusActive: {
    color: 'green',
  },
  statusInactive: {
    color: 'red',
  },
  visitorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b5998',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#3B6FD6',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default commonStyles;
