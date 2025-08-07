import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
  StatusBar, SafeAreaView, Image, Animated, PanResponder
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell, faUserCircle, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { LineChart } from 'react-native-gifted-charts';
import PendingDuesCard from './PendingDuesCard';
import IncomeExpenseLineGraph from './incomeExpenseGraph'; // Assuming this is a custom component for the line graph
import TimelineVisitors from './TimelineVisitors';
import IncomeProgressBar from './IncomeProgressBar';
import UserHomeHeader from './UserHomeHeader';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - 36;
const chartWidth = cardWidth - 24;

const colors = {
  lavender: '#7B61FF',
  lavenderLight: '#F3EEFC',
  lavenderWhite: '#FBF9FF',
  white: '#FFFFFF',
  textPrimary: '#22223B',
  textSecondary: '#6D6D7A',
  border: '#ECE5F6',
  expense: '#F3A712',
  income: '#7B61FF',
  payBtn: '#A78BFA',
  donutBg: '#F3EEFC',
  donutMain: '#7B61FF',
  title: '#6D6D7A', // less prominent title
};

const abbreviateYAxis = (num) => {
  if (num >= 10000000) return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
  if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
  return num.toString();
};

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

function VisitorsAvatars({ visitors }) {
  const maxVisible = 4;
  const visible = visitors.slice(0, maxVisible);
  const remaining = visitors.length - maxVisible;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {visible.map((v) => (
        <View key={v.id} style={[
            styles.visitorCircle,
            v.status === 'in' ? styles.visitorActive : styles.visitorInactive,
          ]}>
          {v.photo
            ? <Image source={{ uri: v.photo }} style={styles.visitorPhoto} />
            : <FontAwesomeIcon icon={faUserCircle} size={22} color={colors.lavender} />}
        </View>
      ))}
      {remaining > 0 && (
        <View style={[styles.visitorCircle, styles.visitorMore]}>
          <Text style={styles.visitorMoreText}>+{remaining}</Text>
        </View>
      )}
    </View>
  );
}

// --- Donut Gauge (with swipe) ---
function GaugeDonut({ achieved, total, mainColor, bgColor }) {
  // achieved and total in "LL"
  const percent = Math.max(0, Math.min(1, achieved / total));
  const r = 54, cx = 80, cy = 78;
  const thickness = 16;
  const startAngle = 180, endAngle = 0;
  const arcBg = describeArc(cx, cy, r, startAngle, endAngle);
  const achievedAngle = 180 - percent * 180;
  const arcAchieved = describeArc(cx, cy, r, startAngle, achievedAngle);

  // Helper to get arc path
  function describeArc(cx, cy, r, startAngle, endAngle) {
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians)),
      };
    };
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", r, r, 0, arcSweep, 0, end.x, end.y
    ].join(" ");
  }

  return (
    <View style={styles.donutCard}>
      <Svg width={160} height={90}>
        {/* light background arc */}
        <Path
          d={arcBg}
          stroke={bgColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
        />
        {/* achieved arc */}
        <Path
          d={arcAchieved}
          stroke={mainColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
      <View style={styles.donutTextCenter}>
        <Text style={styles.donutMainText}>{achieved}LL</Text>
        <Text style={styles.donutSubText}>of {total}LL</Text>
      </View>
    </View>
  );
}

export default function ResidentDashboard() {
  // state for graph/donut period index (swipeable)
  const [periodIdx, setPeriodIdx] = useState(0);

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
  const maxYValue = Math.max(...income, ...expense) * 1.2;

  return (
    <View style={{ flex: 1, backgroundColor: colors.lavenderLight }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
        <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 36 }}>
          {/* Header */}
          <UserHomeHeader
            name={mockUser.name}
            secondary={mockUser.unit}
            bellCount={4}
            onBellPress={() => {}}
            onProfilePress={() => {}}
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

          {/* Swipeable Donut */}
          <Animated.View
            style={[styles.donutCard, { transform: [{ translateX: panX }] }]}
            {...panResponder.panHandlers}
          >
           <IncomeProgressBar
  label="Settlement Overview"
  achieved={500000}
  total={2000000}
  iconName="insert-chart" // any MaterialIcons icon name
  mainColor="#FF7300"
/>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: 'transparent' },
  topContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerIcon: {},
  headerSpacer: { flex: 1 },
  headerIconsRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  notificationDot: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lavender,
    borderWidth: 1,
    borderColor: colors.white,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 2,
  },
  userName: { color: colors.textPrimary, fontSize: 22, fontWeight: 'bold', marginRight: 12, letterSpacing: 0.1 },
  unitText: { color: colors.textSecondary, fontSize: 16, fontWeight: '500' },

  // Card wrapper for all sections
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 0,
    marginBottom: 16,
    paddingTop: 13,
    paddingBottom: 13,
    paddingHorizontal: 16,
    shadowColor: colors.lavender,
    shadowRadius: 4,
    shadowOpacity: 0.08,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.lavenderLight,
  },
  sectionTitle: {
    color: colors.title,
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
    letterSpacing: 0.01,
    textAlign: 'left',
  },
  iconCircle: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.lavenderLight,
    alignItems: 'center', justifyContent: 'center', marginRight: 0,
    borderWidth: 1, borderColor: colors.lavender,
  },
  duesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 2,
  },
  dueAmountText: {
    color: colors.lavender,
    fontWeight: 'bold',
    fontSize: 24,
    marginRight: 10,
  },
  payBtn: {
    marginLeft: 'auto',
    backgroundColor: colors.payBtn,
    borderRadius: 16,
    paddingVertical: 7,
    paddingHorizontal: 22,
  },
  payBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  // Visitors
  visitorAvatarsContainer: { marginTop: 4, alignItems: 'flex-start' },
  visitorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lavenderLight,
    borderWidth: 2,
    borderColor: colors.lavenderLight,
    overflow: 'hidden',
  },
  visitorActive: {
    borderColor: colors.lavender,
    opacity: 1,
  },
  visitorInactive: {
    borderColor: colors.lavenderLight,
    opacity: 0.45,
  },
  visitorPhoto: { width: 28, height: 28, borderRadius: 14 },
  visitorMore: {
    backgroundColor: colors.white,
    borderColor: colors.lavender,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitorMoreText: {
    color: colors.lavender,
    fontWeight: 'bold',
    fontSize: 13,
  },

  // Graph
  graphCard: {
    marginHorizontal: 18,
    marginTop: 0,
    backgroundColor: colors.white,
    borderRadius: 18,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: colors.lavenderLight,
    shadowColor: colors.lavender,
    shadowRadius: 8,
    shadowOpacity: 0.09,
    elevation: 2,
    width: cardWidth,
    alignSelf: 'center',
    marginBottom: 24,
  },
  graphInnerClip: {
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 160,
  },
  graphLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 18,
    alignSelf: 'flex-start',
  },
  legendDot: {
    width: 12, height: 5, borderRadius: 3, marginHorizontal: 3,
  },
  legendLabel: {
    color: colors.textSecondary, fontWeight: '500', fontSize: 13, marginRight: 8,
  },
  graphTabsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 4,
  },
  graphTab: {
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginHorizontal: 1,
  },
  graphTabActive: {
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: colors.lavenderLight,
    marginHorizontal: 1,
  },
  graphTabText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  graphTabActiveText: {
    color: colors.lavender,
    fontSize: 13,
    fontWeight: '700',
  },
  pointerLabelBubble: {
    backgroundColor: colors.lavender,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    elevation: 2,
    marginBottom: 8,
    alignSelf: 'center',
  },
  pointerLabelText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  graphDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.income,
    opacity: 0.7,
  },
  graphDot2: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.expense, opacity: 0.7,
  },

  // Donut
  donutCard: {
    marginHorizontal: 18,
    marginTop: 0,
    backgroundColor: colors.white,
    borderRadius: 18,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: colors.lavender,
    shadowRadius: 8,
    shadowOpacity: 0.06,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.lavenderLight,
    marginBottom: 32,
    width: cardWidth,
    alignSelf: 'center',
    minHeight: 110,
    justifyContent: 'center'
  },
  donutTextCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutMainText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.lavender,
    marginTop: 2,
    letterSpacing: 0.1,
  },
  donutSubText: {
    fontSize: 15,
    marginTop: 2,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});