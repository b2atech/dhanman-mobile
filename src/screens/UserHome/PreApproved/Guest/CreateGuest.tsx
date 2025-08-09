// import React, {useState} from 'react';
// import Logger from '../../../../utils/logger';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import useConfig from '../../../../hooks/useConfig';
// import {addPreApprovedVisitor} from '../../../../api/myHome/visitorLog';
// import {useContext} from 'react';
// import {AuthContext} from '../../../../context/AuthContext';
// import {useNavigation} from '@react-navigation/native';

// const CreateGuest = ({route}) => {
//   const config = useConfig();
//   const navigation = useNavigation();
//   const user = useContext(AuthContext);
//   const {
//     selectedTab,
//     isPrivate,
//     date,
//     time,
//     validHours,
//     selectedOption,
//     entryTime,
//     endDate,
//   } = route.params;
//   const [guestName, setGuestName] = useState('');
//   const [contactNumber, setContactNumber] = useState('');

//   const formatTime = date => {
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     let ampm = hours >= 12 ? 'PM' : 'AM';

//     hours = hours % 12;
//     hours = hours ? hours : 12;
//     minutes = minutes < 10 ? '0' + minutes : minutes;

//     return `${hours}:${minutes} ${ampm}`;
//   };
//   Logger.debug('time', time);

//   const NewEntryTime = date => {
//     let hours = date.getHours();
//     let minutes = date.getMinutes();

//     hours = hours < 10 ? '0' + hours : hours;
//     minutes = minutes < 10 ? '0' + minutes : minutes;

//     return `${hours}:${minutes}`;
//   };

//   const calculateExitTime = (entryTime, validHours) => {
//     if (!(entryTime instanceof Date) || isNaN(entryTime)) {
//       Logger.error('Invalid entryTime:', entryTime);
//       return NewEntryTime(entryTime);
//     }

//     const validHoursInt = parseInt(validHours, 10);

//     if (isNaN(validHoursInt) || validHoursInt <= 0) {
//       Logger.error('Invalid validHours:', validHours);
//       return NewEntryTime(entryTime);
//     }

//     const exitTime = new Date(entryTime);
//     exitTime.setHours(exitTime.getHours() + validHoursInt);

//     return NewEntryTime(exitTime);
//   };

//   const formatDate = date => {
//     const year = date.getFullYear();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');

//     return `${year}-${month}-${day}`;
//   };

//   const handleSubmit = async () => {
//     const formattedStartDate = formatDate(date);
//     const formattedEndDate = formatDate(endDate);
//     const calculatedExitTime =
//       selectedTab === 'Once'
//         ? calculateExitTime(entryTime, validHours)
//         : NewEntryTime(entryTime);

//     const GuestData = {
//       apartmentId: config?.company?.id,
//       firstName: guestName,
//       contactNumber: contactNumber,
//       visitorTypeId: 1,
//       visitTypeId: selectedTab === 'Once' ? 1 : 2,
//       startDate: formattedStartDate,
//       endDate: formattedEndDate,
//       entryTime: NewEntryTime(time),
//       exitTime: calculatedExitTime,
//       vehicleNumber: '',
//       companyName: '',
//       createdBy: user?.user?.dhanmanId,
//     };

//     Logger.debug('Payload', GuestData);
//     try {
//       await addPreApprovedVisitor(GuestData);
//       Alert.alert('Pre-Approved Visitor entry added successfully');

//       navigation.navigate('Invite Link', {
//         visitorDetails: GuestData,
//         startDate: formattedStartDate,
//         endDate: formattedEndDate,
//         entryTime: NewEntryTime(time),
//         exitTime: calculatedExitTime,
//       });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add pre-approved entry.');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.guestContainer}>
//         <Text style={styles.inputLabel}>Guest Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Guest Name"
//           value={guestName}
//           onChangeText={setGuestName}
//         />

//         <Text style={styles.inputLabel}>Contact Number</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter Contact Number"
//           value={contactNumber}
//           onChangeText={setContactNumber}
//           keyboardType="phone-pad"
//         />

//         <View style={styles.dataContainer}>
//           <Text style={styles.dataText}>Event Type: {selectedTab}</Text>
//           <Text style={styles.dataText}>
//             Private: {isPrivate ? 'Yes' : 'No'}
//           </Text>
//           <Text style={styles.dataText}>Date: {date.toDateString()}</Text>
//           <Text style={styles.dataText}>Time: {formatTime(time)}</Text>
//           {selectedTab === 'Once' && (
//             <Text style={styles.dataText}>Valid for: {validHours} hours</Text>
//           )}
//           {selectedTab === 'Frequently' && selectedOption && (
//             <Text style={styles.dataText}>
//               Allow entry for: {selectedOption}
//             </Text>
//           )}
//         </View>

//         <TouchableOpacity onPress={handleSubmit}>
//           <LinearGradient
//             colors={['#3F71D4', '#64A0E0', '#A6D9CE']}
//             style={styles.submitButton}>
//             <Text style={styles.submitText}>Submit</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//   },
//   guestContainer: {
//     width: 350,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     alignItems: 'center',
//     paddingVertical: 40,
//     paddingHorizontal: 25,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 10},
//     shadowOpacity: 0.1,
//     shadowRadius: 15,
//     elevation: 5,
//     opacity: 0.95,
//   },
//   dataContainer: {
//     width: '100%',
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   dataText: {
//     fontSize: 16,
//     color: '#555',
//     marginVertical: 5,
//     fontWeight: '600',
//     alignSelf: 'flex-start',
//   },
//   inputLabel: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     alignSelf: 'flex-start',
//     marginBottom: 10,
//     marginLeft: 5,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 10,
//     marginBottom: 20,
//     fontSize: 16,
//     color: '#333',
//     backgroundColor: '#f9f9f9',
//   },
//   submitButton: {
//     paddingVertical: 18,
//     paddingHorizontal: 50,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     marginTop: 40,
//   },
//   submitText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
// });

// export default CreateGuest;
