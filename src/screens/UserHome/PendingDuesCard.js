import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

export default function PendingDuesCard({ amount = 3200, onPay }) {
  const { theme } = useTheme();
  const { colors, components, spacing } = theme;

  return (
    <View style={[components.card, styles.card]}>
      <View style={styles.leftBlock}>
        <View style={[components.iconCircle, { borderColor: colors.primary }]}>
          <FontAwesomeIcon icon={faFileInvoice} size={20} color={colors.primary} />
        </View>
        <View style={{ marginLeft: spacing.md }}>
          <Text style={[components.sectionTitle, { color: colors.textTertiary }]}>Pending Dues</Text>
          <Text style={[styles.amount, { color: colors.primary }]}>₹{amount.toLocaleString()}</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.payBtn, { backgroundColor: colors.primary }]} onPress={onPay}>
        <Text style={[styles.payBtnText, { color: colors.textInverse }]}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  amount: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 2,
  },
  payBtn: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});