import React, { useContext, useEffect, useState } from 'react';
// import {app} from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import LaunchScreen from '../screens/LaunchScreen';
import { requestUserPermission, notificationListener } from '../api/FCMService';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import HomeScreen from '../screens/UserHome/HomeScreen';
import ResidentHomeDashboard from '../screens/UserHome/ResidentHomeDashboard';
import ResidentHomeDashboardDemo from '../screens/UserHome/ResidentHomeDashboardDemo';
import OnBoarding from '../screens/OnBoardingScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faUser,
  faUsers,
  faCog,
  faTicketAlt,
  faTruck,
} from '@fortawesome/free-solid-svg-icons';
import GateHomeScreen from '../screens/GateHome/GateHome';
import GateServiceProviderScreen from '../screens/GateHome/ServiceProvider/GateServiceProvider';
import GateDeliveryScreen from '../screens/GateHome/Delivery/GateDelivery';
import GateVisitorsScreen from '../screens/GateHome/Visitor/GateVisitor';
import DeliveryApprovalScreen from '../screens/GateHome/Delivery/DeliveryApproval';
import CreateVisitors from '../screens/GateHome/Visitor/CreateVisitor';
import CreateServiceProvider from '../screens/GateHome/ServiceProvider/CreateServiceProvider';
import DeliveryWaitingScreen from '../screens/GateHome/Delivery/DeliveryWaiting';

import { decode as atob, encode as btoa } from 'base-64';
import Settings from '../screens/SettingScreen';
import TicketScreen from '../screens/TicketScreen';
import ViewAllScreen from '../screens/CommonFiles/ViewAllScreen';
import CreateTicket from '../screens/UserHome/Ticket/CreateTicket';
import TicketHomeScreen from '../screens/TicketDashboard/TicketHomeScreen';
import { StyleSheet, View } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisitorLog from '../screens/GateHome/Visitor/VisitorLog';
import ProfileScreen from '../screens/UserHome/ProfileScreen';
// import ProfileScreenOld from "../screens/UserHome/ProfileScreenOld";
import BillsList from '../screens/UserHome/Components/BillsList';



interface NotificationData {
  title: string;
  body: string;
  guestId?: string;
}

interface TabNavigatorProps {
  fcmToken: string;
}

interface User {
  residentId?: number;
  dhanman_roles?: string[];
}

declare const global: any;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const TabNavigatorForUnit = ({ fcmToken }: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = faHome; // Default icon

          if (route.name === 'Home') {
            iconName = faHome;
          } else if (route.name === 'My Unit') {
            iconName = faUser;
          } else if (route.name === 'Activity') {
            iconName = faUsers;
          } else if (route.name === 'Profile') {
            iconName = faCog;
          }
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
      <Tab.Screen name="Home">
        {(props) => <ResidentHomeDashboardDemo {...props} fcmToken={fcmToken} />}
      </Tab.Screen>
      <Tab.Screen name="My Unit" component={MyUnitScreen} />
      <Tab.Screen name="Activity" component={TicketScreen} />
      <Tab.Screen name="Profile" component={Settings} />
    </Tab.Navigator>
  );
};

export const TabNavigatorForGate = ({ fcmToken }: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = faHome; // Default icon

          if (route.name === 'Home') {
            iconName = faHome;
          } else if (route.name === 'Settings') {
            iconName = faCog;
          } else if (route.name === 'Delivery') {
            iconName = faTruck;
          } else if (route.name === 'More') {
            iconName = faCog;
          }
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
          let iconName = faHome;

          if (route.name === 'Home') {
            iconName = faHome;
          }
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

const ROLE_SCREENS = {
  Gate: TabNavigatorForGate,
  unit: TabNavigatorForUnit,
  'System Admin': ({ fcmToken }: TabNavigatorProps) => {
    const [selectedTab, setSelectedTab] = useState('unit');

    useEffect(() => {
      const loadSelectedTab = async () => {
        const storedTab = await AsyncStorage.getItem('selectedTab');
        if (storedTab) {
          setSelectedTab(storedTab);
        }
      };
      loadSelectedTab();
    }, []);

    return (
      <View style={{ flex: 1 }}>
        {selectedTab === 'unit' ? (
          <TabNavigatorForUnit fcmToken={fcmToken} />
        ) : (
          <TabNavigatorForGate fcmToken={fcmToken} />
        )}
      </View>
    );
  },
};

const Home = ({ fcmToken }: TabNavigatorProps) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user as User | undefined;

  const userRoles = user?.dhanman_roles || [];
  console.log('userRole:', userRoles);

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

  const defaultRole = userRoles.length > 0 ? userRoles[0] : 'unit';
  console.log('defaultRole:', defaultRole);

  // let SelectedScreen =
  //   ROLE_SCREENS[defaultRole as keyof typeof ROLE_SCREENS] ||
  //   TabNavigatorForUnit;

  let SelectedScreen: React.ComponentType<TabNavigatorProps>;

  if (selectedTab === 'unit') {
    SelectedScreen = TabNavigatorForUnit;
  } else if (selectedTab === 'Gate') {
    SelectedScreen = TabNavigatorForGate;
  } else if (selectedTab === 'System Admin') {
    // System Admin can switch between both tabs
    SelectedScreen = (props) => {
      const [adminTab, setAdminTab] = useState('unit');

      useEffect(() => {
        const loadAdminTab = async () => {
          const storedTab = await AsyncStorage.getItem('selectedTab');
          if (storedTab) {
            setAdminTab(storedTab);
          }
        };
        loadAdminTab();
      }, []);

      return (
        <View style={{ flex: 1 }}>
          <SelectedScreen fcmToken={fcmToken} />
        </View>
      );
    };
  } else {
    SelectedScreen = TabNavigatorForUnit;
  }

  return (
    <View style={{ flex: 1 }}>
      <SelectedScreen fcmToken={fcmToken} />
    </View>
  );
};

const RootNavigator = ({ fcmToken }: TabNavigatorProps) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user as User | undefined;

  useEffect(() => {
    const checkAndSaveToken = async () => {
      const savedToken = await AsyncStorage.getItem('fcmToken');
      console.log('savedToken', savedToken);
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Launch">
        <Stack.Screen
          name="Launch"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} fcmToken={fcmToken} />}
        </Stack.Screen>
        <Stack.Screen
          name="VisitorDetailScreen"
          component={VisitorDetailScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Unit Visitors"
          component={UnitVisitorsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="View All"
          component={ViewAllScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GateServiceProvider"
          component={GateServiceProviderScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GateDelivery"
          component={GateDeliveryScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="GateVisitors"
          component={GateVisitorsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Visitors Log"
          component={VisitorLog}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Create Service Provider"
          component={CreateServiceProvider}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Create Visitors"
          component={CreateVisitors}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DeliveryApproval"
          component={DeliveryApprovalScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DeliveryWaiting"
          component={DeliveryWaitingScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="CreateTicket"
          component={CreateTicket}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="VisitorsList"
          component={VisitorsList}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Guest Invite"
          component={GuestInvite}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Quick Invite" options={{ headerShown: false }}>
          {(props) => <QuickInvite {...props} type="guest" />}
        </Stack.Screen>
        <Stack.Screen
          name="Frequent Invite"
          component={FrequentInvite}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Private Invite"
          component={PrivateInvite}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Invite Link"
          component={InviteLink}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DailyHelpScreen"
          component={DailyHelpScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Add Family Member"
          component={AddFamilyMember}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Defaulter Screen"
          component={DefaulterScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="PaymentDetailScreen"
          component={PaymentDetailScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Cab Entry"
          component={CabEntry}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Cab Selection"
          component={CabSelection}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Delivery Type"
          component={DeliveryType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Delivery Entry"
          component={DeliveryPreEntry}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create Guest"
          component={CreateGuest}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Bills List"
          component={BillsList}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainRoutes: React.FC<TabNavigatorProps> = ({ fcmToken }) => {
  //   const [fcmToken, setFcmToken] = useState<string>('');
  const [notificationData, setNotificationData] =
    useState<NotificationData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // requestUserPermission(setFcmToken);
    notificationListener((data: any) => {
      setNotificationData(data);
      setModalVisible(true);
    });
  }, []);

  if (typeof global.atob === 'undefined') {
    global.atob = atob;
  }
  if (typeof global.btoa === 'undefined') {
    global.btoa = btoa;
  }

  return (
    <AuthProvider>
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
    </AuthProvider>
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
