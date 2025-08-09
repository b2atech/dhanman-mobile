import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faUserCircle,
  faWallet,
  faUsers,
  faTicketAlt,
  faCalendarAlt,
  faChevronRight,
  faBell,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { residentTheme } from '../../commonStyles/residentTheme';
import SummaryCard from './Components/SummaryCard';
import QuickActionCard from './Components/QuickActionCard';
import UpcomingEventsCard from './Components/UpcomingEventsCard';
import WelcomeHeader from './Components/WelcomeHeader';

const { width: screenWidth } = Dimensions.get('window');

const ResidentHomeDashboard = ({ navigation, fcmToken }) => {
  const { user } = useContext(AuthContext);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  const summaryData = {
    dues: {
      amount: 2450,
      status: 'pending',
      dueDate: '2024-01-15',
    },
    visitors: {
      today: 3,
      pending: 1,
      approved: 2,
    },
    tickets: {
      open: 2,
      resolved: 8,
      total: 10,
    },
    events: {
      upcoming: 2,
      thisWeek: 4,
    },
  };

  const quickActions = [
    {
      id: 1,
      title: 'Invite Guest',
      icon: faUsers,
      color: residentTheme.colors.pastelMint,
      action: () => navigation.navigate('Guest Invite'),
    },
    {
      id: 2,
      title: 'Create Ticket',
      icon: faTicketAlt,
      color: residentTheme.colors.mutedGold,
      action: () => navigation.navigate('CreateTicket'),
    },
    {
      id: 3,
      title: 'Pay Dues',
      icon: faWallet,
      color: residentTheme.colors.primaryUltraLight,
      action: () => navigation.navigate('PaymentScreen'),
    },
    {
      id: 4,
      title: 'View All',
      icon: faChevronRight,
      color: residentTheme.colors.offWhite,
      action: () => navigation.navigate('View All'),
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Meeting',
      date: '2024-01-20',
      time: '10:00 AM',
      location: 'Community Hall',
    },
    {
      id: 2,
      title: 'Maintenance Work',
      date: '2024-01-22',
      time: '2:00 PM',
      location: 'Building A',
    },
  ];

  const renderFloatingActionButton = () => (
    <TouchableOpacity
      style={styles.fab}
      activeOpacity={0.8}
      onPress={() => {
        // Show context-aware quick actions
        navigation.navigate('Quick Invite');
      }}
    >
      <FontAwesomeIcon
        icon={faPlus}
        size={24}
        color={residentTheme.colors.textInverse}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={residentTheme.colors.backgroundPrimary}
        barStyle="dark-content"
      />

      <LinearGradient
        colors={residentTheme.gradients.background.colors}
        start={residentTheme.gradients.background.start}
        end={residentTheme.gradients.background.end}
        style={styles.gradientBackground}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Header */}
          <WelcomeHeader
            greeting={greeting}
            userName={user && user.firstName ? user.firstName : 'Resident'}
            unitNumber={user && user.unitIds && user.unitIds[0] ? user.unitIds[0] : 'A-101'}
            onProfilePress={() => navigation.navigate('Profile')}
            onNotificationPress={() => navigation.navigate('Notifications')}
          />

          {/* Summary Card */}
          <SummaryCard data={summaryData} />

          {/* Quick Actions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={action.id}
                  title={action.title}
                  icon={action.icon}
                  color={action.color}
                  onPress={action.action}
                  index={index}
                />
              ))}
            </View>
          </View>

          {/* Upcoming Events */}
          <UpcomingEventsCard events={upcomingEvents} />

          {/* Bottom spacing for FAB */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Floating Action Button */}
        {renderFloatingActionButton()}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: residentTheme.colors.backgroundPrimary,
  },
  gradientBackground: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: residentTheme.spacing.xxl,
  },
  sectionContainer: {
    paddingHorizontal: residentTheme.spacing.lg,
    marginBottom: residentTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: residentTheme.typography.fontSize.title,
    fontFamily: residentTheme.typography.fontFamily.semiBold,
    color: residentTheme.colors.textPrimary,
    marginBottom: residentTheme.spacing.md,
    letterSpacing: -0.5,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fab: {
    ...residentTheme.components.fab,
  },
  bottomSpacing: {
    height: residentTheme.spacing.xxl,
  },
});

export default ResidentHomeDashboard;
