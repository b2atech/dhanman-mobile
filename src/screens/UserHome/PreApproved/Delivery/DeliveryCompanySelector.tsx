// import React, {useEffect, useState} from 'react';

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Modal,
//   ScrollView,
//   SafeAreaView,
// } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {getDeliveryCompanies} from '../../../../api/myHome/delivery';
// import commonStyles from '../../../../commonStyles/commonStyles';
// import Logger from '../../../../utils/logger';

// const DeliveryCompanySelector = ({visible, onClose, onSelectCompany}) => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     const fetchCompanies = async () => {
//       try {
//         const data = await getDeliveryCompanies();
//         if (isMounted) {
//           setCompanies(data);
//         }
//       } catch (error) {
//         Logger.error('Error fetching companies:', error);
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchCompanies();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const handleCompanySelect = companyName => {
//     onSelectCompany(companyName);
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       transparent={true}
//       onRequestClose={onClose}>
//       <SafeAreaView style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={commonStyles.headerBoldText}>Advanced Options</Text>
//           {loading ? (
//             <Text style={commonStyles.descriptionText}>Loading...</Text>
//           ) : (
//             <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//               {companies.map(item => (
//                 <TouchableOpacity
//                   key={item.deliveryCompanyId}
//                   style={styles.companyItem}
//                   onPress={() => handleCompanySelect(item.deliveryCompanyName)}>
//                   <FontAwesome name="shopping-bag" size={40} color="#555" />
//                   <Text style={commonStyles.descriptionText}>
//                     {item.deliveryCompanyName}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           )}

//           <TouchableOpacity onPress={onClose} style={commonStyles.submitButton}>
//             <Text style={commonStyles.submitButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '90%',
//     height: 400,
//     padding: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   scrollViewContainer: {
//     marginTop: 15,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   companyItem: {
//     flex: 1,
//     alignItems: 'center',
//     marginHorizontal: 10,
//     marginBottom: 15,
//     width: '20%',
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
// });

// export default DeliveryCompanySelector;
