import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

type IncomeProgressBarProps = {
  label?: string;
  achieved?: number;
  total?: number;
  iconName?: string;
  mainColor?: string | null | undefined;
  currency?: string;
};

const IncomeProgressBar: React.FC<IncomeProgressBarProps> = ({
  label = 'Investments',
  achieved = 500000,
  total = 2000000,
  iconName = 'insert-chart',
  mainColor = null, // Will use theme color if not provided
  currency = '₹',
}) => {
  const { theme } = useTheme();
  const { colors, spacing } = theme;

  const progressColor = mainColor || colors.primary;
  const percent = Math.min(achieved / total, 1);

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
        {label}
      </Text>
      <View style={styles.progressContainer}>
        <View style={styles.iconWrapper}>
          <Icon
            name={iconName}
            size={20}
            color={progressColor}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.row}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>
              {label}
            </Text>
            <Text style={[styles.total, { color: colors.textPrimary }]}>
              {`${currency}${total.toLocaleString()}`}
            </Text>
          </View>
          <View style={styles.barWrapper}>
            <View style={[styles.barBg, { backgroundColor: colors.borderPrimary }]} />
            <View style={[
              styles.bar,
              {
                width: `${percent * 100}%`,
                backgroundColor: progressColor,
              },
            ]} />
          </View>
          <View style={styles.row}>
            <Text style={[styles.achieved, { color: colors.textSecondary }]}>
              {`${currency}${achieved.toLocaleString()}`}
            </Text>
            <Text style={[styles.percent, { color: colors.textSecondary }]}>
              {`${Math.round(percent * 100)}%`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  sectionTitle: TextStyle;
  progressContainer: ViewStyle;
  iconWrapper: ViewStyle;
  info: ViewStyle;
  row: ViewStyle;
  label: TextStyle;
  total: TextStyle;
  barWrapper: ViewStyle;
  barBg: ViewStyle;
  bar: ViewStyle;
  achieved: TextStyle;
  percent: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  total: {
    fontWeight: '600',
    fontSize: 14,
  },
  barWrapper: {
    position: 'relative',
    height: 6,
    marginVertical: 8,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 3,
  },
  bar: {
    position: 'absolute',
    height: 6,
    borderRadius: 3,
  },
  achieved: {
    fontSize: 12,
    fontWeight: '500',
  },
  percent: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default IncomeProgressBar;
