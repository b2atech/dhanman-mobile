import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const IncomeProgressBar = ({
  label = 'Investments',
  achieved = 500000,
  total = 2000000,
  iconName = 'insert-chart',
  mainColor = '#FF7300',
  bgColor = '#EFEFEF',
  currency = '₹',
}) => {
  const percent = Math.min(achieved / total, 1);
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon name={iconName} size={20} color={mainColor} />
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.total}>{`${currency}${total.toLocaleString()}`}</Text>
        </View>
        <View style={styles.barWrapper}>
          <View style={[styles.barBg, { backgroundColor: bgColor }]} />
          <View style={[styles.bar, { width: `${percent * 100}%`, backgroundColor: mainColor }]} />
        </View>
        <View style={styles.row}>
          <Text style={styles.achieved}>{`${currency}${achieved.toLocaleString()}`}</Text>
          <Text style={styles.percent}>{`${Math.round(percent * 100)}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Remove border, shadow, and use only minimal margin for separation
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 0,      // Remove extra spacing between cards
    marginHorizontal: 0,    // Remove horizontal margin so it sits flush with parent
    elevation: 0,           // Remove shadow
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  info: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontWeight: 'bold', fontSize: 14, color: '#222' },
  total: { fontWeight: 'bold', fontSize: 14, color: '#222' },
  barWrapper: {
    position: 'relative',
    height: 6,
    marginVertical: 4,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barBg: { ...StyleSheet.absoluteFillObject, borderRadius: 3 },
  bar: { position: 'absolute', height: 6, borderRadius: 3 },
  achieved: { color: '#aaa', fontSize: 11 },
  percent: { color: '#aaa', fontSize: 11 },
});

export default IncomeProgressBar;