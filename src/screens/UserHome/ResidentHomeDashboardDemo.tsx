import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
  StatusBar, SafeAreaView, Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import TimelineVisitors from './TimelineVisitors';
import IncomeExpenseLineGraph from './Graphs/incomeExpenseGraph';
import IncomeProgressBar from './IncomeProgressBar';
import { TabNavigatorProps } from '../../Routes/MainRoute';
import { visitors } from './DummayData';
import DashboardGraphs from './DashboardGraphs';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Subtle color for page background (offwhite/snow)
const snowBg = '#F7F8FA';

// Subtle color for pending dues label
const subtleTextColor = 'rgba(255,255,255,0.72)';

export default function ResidentDashboard({ fcmToken }: TabNavigatorProps) {
  const { theme } = useTheme();
  const { colors, components, spacing, gradients } = theme;
  const { companyId, periodType, period, year } = { companyId: 'a723f0a0-db0f-4b7a-ae6a-fd15b8ac7ca9', periodType: 1, period: 2024, year: 2024 };
  // Mock user data
  const mockUser = { name: 'Marathi Mawala', unit: 'A-101' };
  const pendingAmount = 3000;

  // Online profile image
  const profileImageUrl = 'https://randomuser.me/api/portraits/men/32.jpg';

  return (
    <View style={{ flex: 1, backgroundColor: '#38b7a7' }}>
      <LinearGradient
        colors={gradients.background.colors}
        start={gradients.background.start}
        end={gradients.background.end}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />

          {/* Top Card Section */}
          <View style={styles.topCard}>
            {/* Header Row */}
            <View style={styles.headerRow}>
              {/* Profile Image */}
              <Image
                source={{ uri: profileImageUrl }}
                style={styles.profileImage}
              />
              {/* Name and Unit */}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.nameText}>{mockUser.name}</Text>
                <Text style={styles.unitText}>{mockUser.unit}</Text>
              </View>
              {/* Bell Icon */}
              <TouchableOpacity style={styles.bellCircle}>
                <FontAwesomeIcon icon={faBell} size={22} color="#fff" />
                <View style={styles.badge} />
              </TouchableOpacity>
            </View>
            {/* Pending Dues Section */}
            <View style={styles.pendingDuesArea}>
              <View>
                <Text style={styles.pendingLabel}>Pending dues</Text>
                <Text style={styles.pendingAmount}>₹{pendingAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
              </View>
              <TouchableOpacity style={styles.payNowCircle}>
                <Image
                  source={{ uri: 'https://img.icons8.com/fluency/48/money.png' }} // Mild green pay icon
                  style={styles.payIcon}
                />
                <Text style={styles.payNowText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content Section */}
          <View style={styles.mainContent}>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={{ paddingBottom: spacing['6xl'] }}
              showsVerticalScrollIndicator={false}
            >
              {/* Today's Visitors - more compact and less padding */}
               <TimelineVisitors visitors={visitors} />

              {/* Income vs Expense Graph */}
             <View style={styles.sectionCard}>
  <DashboardGraphs
    incomeExpense={{
      companyId,        // Pass relevant companyId
      periodType,       // Pass relevant periodType
      period,           // Pass relevant period
      // Remove static arrays: all graphs now fetch their own API data
    }}
    expenseCategories={{
      companyId,        // Pass relevant companyId
      year,             // Or other prop required by ExpensesPieChart
      // Add other needed props for API call
    }}
    topExpenses={{
      companyId,        // Pass relevant companyId
      year,             // Or other prop required by TopExpensesBarChart
      // Add other needed props for API call
    }}
  />
</View>

              {/* Settlement Overview */}
              <View style={styles.sectionCard}>
                <IncomeProgressBar
                  label="Settlement Overview"
                  achieved={500000}
                  total={2000000}
                  iconName="insert-chart"
                  mainColor={colors.primary}
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  topCard: {
    width: screenWidth,
    backgroundColor: '#38b7a7',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 12,
    elevation: 2,
    minHeight: 130,
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 0,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#eee',
  },
  nameText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  unitText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  bellCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#fff',
  },
  pendingDuesArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 30,
    paddingBottom: 10,
    // No border for clean look
  },
  pendingLabel: {
    color: subtleTextColor,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  pendingAmount: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  payNowCircle: {
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  payIcon: {
    width: 28,
    height: 28,
    marginBottom: 2,
  },
  payNowText: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    backgroundColor: snowBg,
    marginTop: -10,
    paddingHorizontal: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 10, // Reduced padding for compact look
  },
  visitorsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 10,
    paddingHorizontal: 10, // Reduced padding
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  visitorsTitle: {
    fontSize: 15,
    color: '#189e8a',
    fontWeight: '600',
    marginBottom: 4,
  },
  visitorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    flexWrap: 'wrap',
  },
  visitorItem: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 55,
  },
  visitorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 2,
    backgroundColor: '#eee',
  },
  visitorTime: {
    fontSize: 12,
    color: '#189e8a',
    fontWeight: 'bold',
  },
  visitorStatus: {
    fontSize: 12,
    color: '#666',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
});