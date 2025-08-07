import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
  StatusBar, SafeAreaView, Image, Animated, PanResponder
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, G } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell, faUserCircle, faFileInvoice, faPlus } from '@fortawesome/free-solid-svg-icons';
import { LineChart } from 'react-native-gifted-charts';
import { useTheme } from '../../context/ThemeContext';
import PendingDuesCard from './PendingDuesCard';
import IncomeExpenseLineGraph from './incomeExpenseGraph'; // Assuming this is a custom component for the line graph
import TimelineVisitors from './TimelineVisitors';
import IncomeProgressBar from './IncomeProgressBar';
import UserHomeHeader from './UserHomeHeader';

const { width: screenWidth } = Dimensions.get('window');

export default function ResidentDashboard() {
  const { theme } = useTheme();
  const { colors, components, spacing, gradients, layout } = theme;
  
  // state for graph/donut period index (swipeable)
  const [periodIdx, setPeriodIdx] = useState(0);

  // Mock data
  const mockUser = { name: 'John', unit: 'A-101' };

  const periods = [
    {
      key: '3M',
      xLabels: ['May', 'Jun', 'Jul'],
      income: [120000, 87000, 140000],
      expense: [70000, 82000, 93000],
      donut: { achieved: 8, total: 9.5 },
    },
    {
      key: '6M',
      xLabels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      income: [65000, 85000, 110000, 120000, 87000, 140000],
      expense: [54000, 64000, 79000, 70000, 82000, 93000],
      donut: { achieved: 5.5, total: 9.5 },
    },
    {
      key: '1Y',
      xLabels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      income: [45000, 55000, 68000, 62000, 80000, 97000, 65000, 85000, 110000, 120000, 87000, 140000],
      expense: [38000, 43000, 53000, 48000, 64000, 79000, 54000, 64000, 79000, 70000, 82000, 93000],
      donut: { achieved: 9.2, total: 10 },
    },
  ];

  const visitors = [
    { id: '1', name: 'Amit', photo: 'https://randomuser.me/api/portraits/men/11.jpg', status: 'in' },
    { id: '2', name: 'Priya', photo: '', status: 'out' },
    { id: '3', name: 'David', photo: 'https://randomuser.me/api/portraits/men/33.jpg', status: 'in' },
    { id: '4', name: 'Sonia', photo: '', status: 'out' },
    { id: '5', name: 'Anil', photo: 'https://randomuser.me/api/portraits/men/34.jpg', status: 'in' },
  ];
  // SWIPE logic for graph and donut (shared)
  const panX = useRef(new Animated.Value(0)).current;
  const SWIPE_THRESHOLD = 50;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 10,
      onPanResponderMove: Animated.event([null, { dx: panX }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SWIPE_THRESHOLD && periodIdx < periods.length - 1) {
          setPeriodIdx(periodIdx + 1);
        } else if (gestureState.dx > SWIPE_THRESHOLD && periodIdx > 0) {
          setPeriodIdx(periodIdx - 1);
        }
        Animated.spring(panX, { toValue: 0, useNativeDriver: false }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(panX, { toValue: 0, useNativeDriver: false }).start();
      },
    })
  ).current;

  const { xLabels, income, expense, donut } = periods[periodIdx];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradients.background.colors}
        start={gradients.background.start}
        end={gradients.background.end}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
          
          {/* Top-right SVG gradient as mentioned in requirements */}
          <View style={styles.topRightGradient}>
            <LinearGradient
              colors={gradients.topRightAccent.colors}
              start={gradients.topRightAccent.start}
              end={gradients.topRightAccent.end}
              style={styles.topRightGradientInner}
            />
          </View>

          <ScrollView 
            style={styles.scroll} 
            contentContainerStyle={{ paddingBottom: spacing['6xl'] }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <UserHomeHeader
              name={mockUser.name}
              secondary={mockUser.unit}
              bellCount={4}
              onBellPress={() => {}}
              onProfilePress={() => {}}
              style={{ backgroundColor: colors.backgroundTertiary }}
            />

            <PendingDuesCard amount={3000} onPay={() => { /* handle pay */ }} />

            <TimelineVisitors
              visitors={[
                { id: '1', name: 'Amit', photo: 'https://randomuser.me/api/portraits/men/11.jpg', status: 'in', time: '10:30' },
                { id: '2', name: 'Priya', photo: '', status: 'out', time: '09:40' },
                { id: '3', name: 'David', photo: 'https://randomuser.me/api/portraits/men/33.jpg', status: 'in', time: '11:15' },
                { id: '4', name: 'Sonia', photo: '', status: 'out', time: '08:55' },
                { id: '5', name: 'Anil', photo: 'https://randomuser.me/api/portraits/men/34.jpg', status: 'in', time: '12:12' },
              ]}
            />

            <IncomeExpenseLineGraph
              incomeData={[120000, 87000, 140000]}
              expenseData={[70000, 82000, 93000]}
              xLabels={['May', 'Jun', 'Jul']}
            />

            {/* Settlement Overview */}
            <View style={[components.card, { marginHorizontal: spacing.lg }]}>
              <IncomeProgressBar
                label="Settlement Overview"
                achieved={500000}
                total={2000000}
                iconName="insert-chart"
                mainColor={colors.primary}
              />
            </View>
          </ScrollView>

          {/* Quick Action Floating Button */}
          <TouchableOpacity 
            style={[components.fab, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
            onPress={() => {/* Handle quick action */}}
          >
            <FontAwesomeIcon icon={faPlus} size={24} color={colors.textInverse} />
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { 
    flex: 1, 
    backgroundColor: 'transparent' 
  },
  topRightGradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 120,
    height: 120,
    zIndex: 1,
    overflow: 'hidden',
    borderBottomLeftRadius: 60,
  },
  topRightGradientInner: {
    width: '100%',
    height: '100%',
  },
});