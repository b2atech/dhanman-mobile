import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
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
  faArrowUp,
  faArrowDown,
  faClock,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

// Mock data for demonstration
const mockUser = {
  firstName: 'John',
  unitIds: ['A-101'],
};

const mockNavigation = {
  navigate: (screen) => console.log(`Navigate to: ${screen}`),
};

// Simplified theme colors
const colors = {
  primary: '#A78BFA',
  primaryLight: '#C4B5FD',
  primaryUltraLight: '#EDE9FE',
  offWhite: '#FAFAFA',
  mutedGold: '#F3E8D3',
  pastelMint: '#D1FAE5',
  lighterNavy: '#4F46E5',
  textPrimary: '#334155',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textAccent: '#6366F1',
  backgroundPrimary: '#FFFFFF',
  borderPrimary: '#E2E8F0',
  success: '#10B981',
  error: '#EF4444',
  shadow: 'rgba(160, 139, 250, 0.08)',
};

const spacing = {
  xs: 6,
  sm: 12,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
};

const { width: screenWidth } = Dimensions.get('window');

// Simplified components for demo
const WelcomeHeaderDemo = ({ greeting, userName, unitNumber }) => (
  <View style={demoStyles.welcomeHeader}>
    <View style={demoStyles.leftContent}>
      <Text style={demoStyles.greeting}>{greeting}</Text>
      <Text style={demoStyles.userName}>{userName}</Text>
      <Text style={demoStyles.unitNumber}>Unit {unitNumber}</Text>
    </View>
    <View style={demoStyles.rightContent}>
      <TouchableOpacity style={demoStyles.notificationButton}>
        <FontAwesomeIcon icon={faBell} size={20} color={colors.textSecondary} />
        <View style={demoStyles.notificationBadge}>
          <Text style={demoStyles.badgeText}>2</Text>
        </View>
      </TouchableOpacity>
      <View style={demoStyles.avatarPlaceholder}>
        <FontAwesomeIcon icon={faUserCircle} size={24} color={colors.primary} />
      </View>
    </View>
  </View>
);

const SummaryCardDemo = ({ data }) => (
  <View style={demoStyles.summaryCard}>
    <View style={demoStyles.cardHeader}>
      <Text style={demoStyles.cardTitle}>Summary</Text>
    </View>
    <View style={demoStyles.statsGrid}>
      <View style={demoStyles.statItem}>
        <View style={[demoStyles.iconContainer, { backgroundColor: colors.mutedGold }]}>
          <FontAwesomeIcon icon={faWallet} size={18} color={colors.lighterNavy} />
        </View>
        <View style={demoStyles.statContent}>
          <Text style={demoStyles.statValue}>₹2,450</Text>
          <Text style={demoStyles.statLabel}>Monthly Dues</Text>
          <View style={demoStyles.subtitleContainer}>
            <FontAwesomeIcon icon={faArrowDown} size={10} color={colors.error} />
            <Text style={demoStyles.statSubtitle}>Due Jan 15</Text>
          </View>
        </View>
      </View>

      <View style={demoStyles.statItem}>
        <View style={[demoStyles.iconContainer, { backgroundColor: colors.pastelMint }]}>
          <FontAwesomeIcon icon={faUsers} size={18} color={colors.lighterNavy} />
        </View>
        <View style={demoStyles.statContent}>
          <Text style={demoStyles.statValue}>3</Text>
          <Text style={demoStyles.statLabel}>Visitors Today</Text>
          <View style={demoStyles.subtitleContainer}>
            <FontAwesomeIcon icon={faArrowUp} size={10} color={colors.success} />
            <Text style={demoStyles.statSubtitle}>1 pending</Text>
          </View>
        </View>
      </View>

      <View style={demoStyles.statItem}>
        <View style={[demoStyles.iconContainer, { backgroundColor: colors.primaryUltraLight }]}>
          <FontAwesomeIcon icon={faTicketAlt} size={18} color={colors.lighterNavy} />
        </View>
        <View style={demoStyles.statContent}>
          <Text style={demoStyles.statValue}>2</Text>
          <Text style={demoStyles.statLabel}>Open Tickets</Text>
          <Text style={demoStyles.statSubtitle}>8 resolved</Text>
        </View>
      </View>

      <View style={demoStyles.statItem}>
        <View style={[demoStyles.iconContainer, { backgroundColor: colors.offWhite }]}>
          <FontAwesomeIcon icon={faCalendarAlt} size={18} color={colors.lighterNavy} />
        </View>
        <View style={demoStyles.statContent}>
          <Text style={demoStyles.statValue}>2</Text>
          <Text style={demoStyles.statLabel}>Events</Text>
          <Text style={demoStyles.statSubtitle}>this week</Text>
        </View>
      </View>
    </View>
  </View>
);

const QuickActionDemo = ({ title, icon, color }) => (
  <TouchableOpacity style={[demoStyles.quickAction, { backgroundColor: color }]}>
    <FontAwesomeIcon icon={icon} size={24} color={colors.lighterNavy} />
    <Text style={demoStyles.quickActionText}>{title}</Text>
  </TouchableOpacity>
);

const UpcomingEventsDemo = () => (
  <View style={demoStyles.eventsCard}>
    <View style={demoStyles.cardHeader}>
      <Text style={demoStyles.cardTitle}>Upcoming Events</Text>
      <Text style={demoStyles.viewAllText}>View All</Text>
    </View>
    <View style={demoStyles.eventItem}>
      <Text style={demoStyles.eventTitle}>Community Meeting</Text>
      <View style={demoStyles.eventDetails}>
        <View style={demoStyles.eventDetail}>
          <FontAwesomeIcon icon={faCalendarAlt} size={12} color={colors.textTertiary} />
          <Text style={demoStyles.eventDetailText}>Jan 20</Text>
        </View>
        <View style={demoStyles.eventDetail}>
          <FontAwesomeIcon icon={faClock} size={12} color={colors.textTertiary} />
          <Text style={demoStyles.eventDetailText}>10:00 AM</Text>
        </View>
        <View style={demoStyles.eventDetail}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={12} color={colors.textTertiary} />
          <Text style={demoStyles.eventDetailText}>Community Hall</Text>
        </View>
      </View>
    </View>
  </View>
);

const ResidentHomeDashboardDemo = () => {
  return (
    <View style={demoStyles.container}>
      <StatusBar backgroundColor={colors.backgroundPrimary} barStyle="dark-content" />
      
      <ScrollView style={demoStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <WelcomeHeaderDemo
          greeting="Good Morning"
          userName="John"
          unitNumber="A-101"
        />

        <SummaryCardDemo />

        <View style={demoStyles.section}>
          <Text style={demoStyles.sectionTitle}>Quick Actions</Text>
          <View style={demoStyles.quickActionsGrid}>
            <QuickActionDemo title="Invite Guest" icon={faUsers} color={colors.pastelMint} />
            <QuickActionDemo title="Create Ticket" icon={faTicketAlt} color={colors.mutedGold} />
            <QuickActionDemo title="Pay Dues" icon={faWallet} color={colors.primaryUltraLight} />
            <QuickActionDemo title="View All" icon={faChevronRight} color={colors.offWhite} />
          </View>
        </View>

        <UpcomingEventsDemo />

        <View style={demoStyles.bottomSpacing} />
      </ScrollView>

      <TouchableOpacity style={demoStyles.fab}>
        <FontAwesomeIcon icon={faPlus} size={24} color={colors.textInverse} />
      </TouchableOpacity>
    </View>
  );
};

const demoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  scrollContainer: {
    flex: 1,
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  leftContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    fontFamily: 'Poppins-Regular',
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontFamily: 'Poppins-Bold',
  },
  unitNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textAccent,
    fontFamily: 'Poppins-SemiBold',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: spacing.sm,
    position: 'relative',
    marginRight: spacing.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textInverse,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryCard: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    fontFamily: 'Poppins-Bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 2,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
    fontFamily: 'Poppins-Medium',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    fontFamily: 'Poppins-SemiBold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (screenWidth - spacing.lg * 2 - spacing.sm) / 2,
    height: 120,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.sm,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  eventsCard: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.backgroundPrimary,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textAccent,
    fontFamily: 'Poppins-Medium',
  },
  eventItem: {
    paddingVertical: spacing.md,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontFamily: 'Poppins-SemiBold',
  },
  eventDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  eventDetailText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    fontFamily: 'Poppins-Regular',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});

export default ResidentHomeDashboardDemo;