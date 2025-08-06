import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faWallet,
  faUsers,
  faTicketAlt,
  faCalendarAlt,
  faArrowUp,
  faArrowDown,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { LineChart } from 'react-native-gifted-charts';
import { residentTheme } from '../../../commonStyles/residentTheme';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - (residentTheme.spacing.lg * 2);

const SummaryCard = ({ data }) => {
  // Mini chart data for demonstration
  const miniChartData = [
    { value: 50 },
    { value: 80 },
    { value: 90 },
    { value: 70 },
    { value: 100 },
  ];

  const renderStatItem = (icon, label, value, subtitle, color, trend) => (
    <View style={styles.statItem}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <FontAwesomeIcon
          icon={icon}
          size={18}
          color={residentTheme.colors.lighterNavy}
        />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        {subtitle && (
          <View style={styles.subtitleContainer}>
            {trend && (
              <FontAwesomeIcon
                icon={trend === 'up' ? faArrowUp : trend === 'down' ? faArrowDown : faClock}
                size={10}
                color={
                  trend === 'up' 
                    ? residentTheme.colors.success 
                    : trend === 'down' 
                    ? residentTheme.colors.error 
                    : residentTheme.colors.textTertiary
                }
                style={styles.trendIcon}
              />
            )}
            <Text style={styles.statSubtitle}>{subtitle}</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={residentTheme.gradients.card.colors}
        start={residentTheme.gradients.card.start}
        end={residentTheme.gradients.card.end}
        style={styles.card}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Summary</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={miniChartData}
              width={60}
              height={24}
              color={residentTheme.colors.primary}
              thickness={2}
              hideDataPoints
              hideAxesAndRules
              curved
              areaChart
              startFillColor={residentTheme.colors.primaryLight}
              endFillColor={residentTheme.colors.primaryUltraLight}
              startOpacity={0.8}
              endOpacity={0.1}
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {renderStatItem(
            faWallet,
            'Monthly Dues',
            `₹${data.dues.amount.toLocaleString()}`,
            `Due ${data.dues.dueDate}`,
            residentTheme.colors.mutedGold,
            'down'
          )}
          
          {renderStatItem(
            faUsers,
            'Visitors Today',
            data.visitors.today,
            `${data.visitors.pending} pending`,
            residentTheme.colors.pastelMint,
            'up'
          )}
          
          {renderStatItem(
            faTicketAlt,
            'Open Tickets',
            data.tickets.open,
            `${data.tickets.resolved} resolved`,
            residentTheme.colors.primaryUltraLight,
            null
          )}
          
          {renderStatItem(
            faCalendarAlt,
            'Events',
            data.events.upcoming,
            'this week',
            residentTheme.colors.offWhite,
            null
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: residentTheme.spacing.lg,
    marginBottom: residentTheme.spacing.lg,
  },
  card: {
    ...residentTheme.components.summaryCard,
    width: cardWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: residentTheme.spacing.lg,
  },
  title: {
    fontSize: residentTheme.typography.fontSize.title,
    fontFamily: residentTheme.typography.fontFamily.bold,
    color: residentTheme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  chartContainer: {
    opacity: 0.8,
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
    marginBottom: residentTheme.spacing.lg,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: residentTheme.spacing.sm,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: residentTheme.typography.fontSize.title,
    fontFamily: residentTheme.typography.fontFamily.bold,
    color: residentTheme.colors.textPrimary,
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: residentTheme.typography.fontSize.caption,
    fontFamily: residentTheme.typography.fontFamily.medium,
    color: residentTheme.colors.textSecondary,
    marginBottom: 2,
    letterSpacing: 0.25,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    marginRight: 4,
  },
  statSubtitle: {
    fontSize: residentTheme.typography.fontSize.caption,
    fontFamily: residentTheme.typography.fontFamily.regular,
    color: residentTheme.colors.textTertiary,
    letterSpacing: 0.25,
  },
});

export default SummaryCard;