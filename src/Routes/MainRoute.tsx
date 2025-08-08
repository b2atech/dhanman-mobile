import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faUsers, faCog, faTruck } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode as atob, encode as btoa } from 'base-64';
import { requestUserPermission, notificationListener } from '../api/FCMService';
import { AuthContext } from '../context/AuthContext';

// Screens
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import LaunchScreen from '../screens/LaunchScreen';
import HomeScreen from '../screens/UserHome/HomeScreen';
import ResidentHomeDashboard from '../screens/UserHome/ResidentHomeDashboard';
import ResidentHomeDashboardDemo from '../screens/UserHome/ResidentHomeDashboardDemo';
import OnBoarding from '../screens/OnBoardingScreen';

import GateHomeScreen from '../screens/GateHome/GateHome';
import GateServiceProviderScreen from '../screens/GateHome/ServiceProvider/GateServiceProvider';
import GateDeliveryScreen from '../screens/GateHome/Delivery/GateDelivery';
import GateVisitorsScreen from '../screens/GateHome/Visitor/GateVisitor';
import DeliveryApprovalScreen from '../screens/GateHome/Delivery/DeliveryApproval';
import CreateVisitors from '../screens/GateHome/Visitor/CreateVisitor';
import CreateServiceProvider from '../screens/GateHome/ServiceProvider/CreateServiceProvider';
import DeliveryWaitingScreen from '../screens/GateHome/Delivery/DeliveryWaiting';

import Settings from '../screens/SettingScreen';
import TicketScreen from '../screens/TicketScreen';
import ViewAllScreen from '../screens/CommonFiles/ViewAllScreen';
import CreateTicket from '../screens/UserHome/Ticket/CreateTicket';
import TicketHomeScreen from '../screens/TicketDashboard/TicketHomeScreen';
import MyUnitScreen from '../screens/MyUnitScreen';
import DailyHelpScreen from '../screens/UserHome/DailyHelpScreen';
import AddFamilyMember from '../screens/UserHome/AddFamilyMember';
import GuestInvite from '../screens/UserHome/PreApproved/Guest/GuestInvite';
import QuickInvite from '../screens/UserHome/PreApproved/Guest/QuickInvite';
import DefaulterScreen from '../screens/UserHome/Defaulter/DefaulterScreen';
import FCMModal from '../components/FCMModal';
import FrequentInvite from '../screens/UserHome/PreApproved/Guest/FrequentInvite';
import PrivateInvite from '../screens/UserHome/PreApproved/Guest/PrivateInvite';
import VisitorDetailScreen from '../screens/UserHome/visitorDetailScreen';
import VisitorsList from '../screens/UserHome/visitorsList';
import InviteLink from '../screens/UserHome/PreApproved/Guest/InviteLink';
import PaymentScreen from '../screens/CommonFiles/PaymentScreen';
import PaymentDetailScreen from '../screens/CommonFiles/PaymentDetailScreen';
import CabEntry from '../screens/UserHome/PreApproved/Cab/CabEntry';
import CabSelection from '../screens/UserHome/PreApproved/Cab/CabSelection';
import DeliveryPreEntry from '../screens/UserHome/PreApproved/Delivery/DeliveryPreEntry';
import DeliveryType from '../screens/UserHome/PreApproved/Delivery/DeliveryType';
import CreateGuest from '../screens/UserHome/PreApproved/Guest/CreateGuest';
import UnitVisitorsScreen from '../screens/UserHome/unitVisitorsScreen';
import { SaveFCMToken } from '../api/myHome/fcmService';
import VisitorLog from '../screens/GateHome/Visitor/VisitorLog';
import ProfileScreen from '../screens/UserHome/ProfileScreen';
import BillsList from '../screens/UserHome/Components/BillsList';

interface NotificationData {
  title: string;
  body: string;
  guestId?: string;
}

export interface TabNavigatorProps {
  fcmToken: string;
}

interface User {
  residentId?: number;
  dhanman_roles?: string[];
}

declare const global: any;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** ---- Tabs: Unit ---- */
export const TabNavigatorForUnit = ({ fcmToken }: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = faHome; // default
          if (route.name === 'UnitHome') {iconName = faHome;}
          else if (route.name === 'My Unit') {iconName = faUser;}
          else if (route.name === 'Activity') {iconName = faUsers;}
          else if (route.name === 'Profile') {iconName = faCog;}
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: 10,
          paddingTop: 10,
          height: 60,
        },
        headerShown: false,
      })}
    >
      {/* renamed from 'Home' to 'UnitHome' to avoid name collision */}
      <Tab.Screen name="UnitHome">
        {(props) => <ResidentHomeDashboardDemo {...props} fcmToken={fcmToken} />}
      </Tab.Screen>
      <Tab.Screen name="My Unit" component={MyUnitScreen} />
      <Tab.Screen name="Activity" component={TicketScreen} />
      <Tab.Screen name="Profile" component={Settings} />
    </Tab.Navigator>
  );
};

/** ---- Tabs: Gate ---- */
export const TabNavigatorForGate = ({ fcmToken }: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = faHome; // default
          if (route.name === 'GateHome') {iconName = faHome;}
          else if (route.name === 'Delivery') {iconName = faTruck;}
          else if (route.name === 'Settings') {iconName = faCog;}
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="GateHome">
        {(props) => <GateHomeScreen {...props} fcmToken={fcmToken} />}
      </Tab.Screen>
      <Tab.Screen name="Delivery" component={DeliveryWaitingScreen} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const TabNavigatorForTicket = ({ fcmToken }: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // single tab; still map for completeness
          let iconName = faHome;
          if (route.name === 'TicketHome') {iconName = faHome;}
          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00BFFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          paddingBottom: 10,
          paddingTop: 10,
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="TicketHome">
        {(props) => <TicketHomeScreen {...props} fcmToken={fcmToken || ''} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

/** ---- Role-based Home (decides which tab set to show) ---- */
const Home = ({ fcmToken }: TabNavigatorProps) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user as User | undefined;

  const userRoles = user?.dhanman_roles || [];
  const [selectedTab, setSelectedTab] = useState('unit');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSelectedTab = async () => {
      const storedTab = await AsyncStorage.getItem('selectedTab');
      if (storedTab) {
        setSelectedTab(storedTab);
      } else if (userRoles.length > 0) {
        setSelectedTab(userRoles[0]);
      }
      setLoading(false);
    };
    loadSelectedTab();
  }, [userRoles]);

  if (loading) {return null;}

  let SelectedScreen: React.ComponentType<TabNavigatorProps>;
  if (selectedTab === 'unit') {SelectedScreen = TabNavigatorForUnit;}
  else if (selectedTab === 'Gate') {SelectedScreen = TabNavigatorForGate;}
  else if (selectedTab === 'System Admin') {SelectedScreen = TabNavigatorForUnit;} // default view for admins
  else {SelectedScreen = TabNavigatorForUnit;}

  return (
    <View style={{ flex: 1 }}>
      <SelectedScreen fcmToken={fcmToken} />
    </View>
  );
};

/** ---- Root Stack (NO NavigationContainer here) ---- */
const RootNavigator = ({ fcmToken }: TabNavigatorProps) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user as User | undefined;

  useEffect(() => {
    // expose atob/btoa in RN env
    if (typeof global.atob === 'undefined') {global.atob = atob;}
    if (typeof global.btoa === 'undefined') {global.btoa = btoa;}
  }, []);

  useEffect(() => {
    const checkAndSaveToken = async () => {
      const savedToken = await AsyncStorage.getItem('fcmToken');
      if (savedToken !== fcmToken && fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        const residentId = user?.residentId || 0;
        if (residentId) {
          try {
            await SaveFCMToken(fcmToken);
            console.log('✅ FCM Token saved to the database');
          } catch (error) {
            console.error('Error saving FCM token:', error);
          }
        }
      }
    };
    if (fcmToken && user) {
      checkAndSaveToken();
    }
  }, [fcmToken, user]);

  return (
    <Stack.Navigator initialRouteName="Launch">
      <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

      {/* renamed from 'Home' to 'Main' to avoid nested 'Home' names */}
      <Stack.Screen name="Main" options={{ headerShown: false }}>
        {(props) => <Home {...props} fcmToken={fcmToken} />}
      </Stack.Screen>

      <Stack.Screen name="VisitorDetailScreen" component={VisitorDetailScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Unit Visitors" component={UnitVisitorsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="View All" component={ViewAllScreen} options={{ headerShown: true }} />
      <Stack.Screen name="GateServiceProvider" component={GateServiceProviderScreen} options={{ headerShown: true }} />
      <Stack.Screen name="GateDelivery" component={GateDeliveryScreen} options={{ headerShown: true }} />
      <Stack.Screen name="GateVisitors" component={GateVisitorsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Visitors Log" component={VisitorLog} options={{ headerShown: true }} />
      <Stack.Screen name="Create Service Provider" component={CreateServiceProvider} options={{ headerShown: true }} />
      <Stack.Screen name="Create Visitors" component={CreateVisitors} options={{ headerShown: true }} />
      <Stack.Screen name="DeliveryApproval" component={DeliveryApprovalScreen} options={{ headerShown: true }} />
      <Stack.Screen name="DeliveryWaiting" component={DeliveryWaitingScreen} options={{ headerShown: true }} />
      <Stack.Screen name="CreateTicket" component={CreateTicket} options={{ headerShown: true }} />
      <Stack.Screen name="VisitorsList" component={VisitorsList} options={{ headerShown: true }} />
      <Stack.Screen name="Guest Invite" component={GuestInvite} options={{ headerShown: false }} />
      <Stack.Screen name="Quick Invite" options={{ headerShown: false }}>
        {(props) => <QuickInvite {...props} type="guest" />}
      </Stack.Screen>
      <Stack.Screen name="Frequent Invite" component={FrequentInvite} options={{ headerShown: false }} />
      <Stack.Screen name="Private Invite" component={PrivateInvite} options={{ headerShown: false }} />
      <Stack.Screen name="Invite Link" component={InviteLink} options={{ headerShown: true }} />
      <Stack.Screen name="DailyHelpScreen" component={DailyHelpScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Add Family Member" component={AddFamilyMember} options={{ headerShown: true }} />
      <Stack.Screen name="Defaulter Screen" component={DefaulterScreen} options={{ headerShown: true }} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: true }} />
      <Stack.Screen name="PaymentDetailScreen" component={PaymentDetailScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Cab Entry" component={CabEntry} options={{ headerShown: true }} />
      <Stack.Screen name="Cab Selection" component={CabSelection} options={{ headerShown: true }} />
      <Stack.Screen name="Delivery Type" component={DeliveryType} options={{ headerShown: false }} />
      <Stack.Screen name="Delivery Entry" component={DeliveryPreEntry} options={{ headerShown: false }} />
      <Stack.Screen name="Create Guest" component={CreateGuest} options={{ headerShown: true }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="Bills List" component={BillsList} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

const MainRoutes: React.FC<TabNavigatorProps> = ({ fcmToken }) => {
  const [notificationData, setNotificationData] = useState<NotificationData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
  const unsub = notificationListener((data: any) => {
    setNotificationData(data);
    setModalVisible(true);
  });
  return () => {
    if (typeof unsub === 'function') {unsub();}
  };
}, []);

  // Ensure atob/btoa exist in RN
  if (typeof global.atob === 'undefined') {global.atob = atob;}
  if (typeof global.btoa === 'undefined') {global.btoa = btoa;}

  return (
    <>
      <RootNavigator fcmToken={fcmToken} />
      {notificationData && (
        <FCMModal
          visible={modalVisible}
          title={notificationData.title}
          body={notificationData.body}
          guestId={notificationData.guestId}
          onClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  accessDeniedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
});

export default MainRoutes;
