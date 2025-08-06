import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons';

const colors = {
  lavender: '#A78BFA',
  lavenderText: '#7B61FF',
  lavenderLight: '#F3EEFC',
  white: '#FFFFFF',
  title: '#6D6D7A',
  shadow: '#ECE5F6',
};

export default function PendingDuesCard({ amount = 3200, onPay }) {
  return (
    <View style={styles.card}>
      <View style={styles.leftBlock}>
        <View style={styles.iconCircle}>
          <FontAwesomeIcon icon={faFileInvoice} size={20} color={colors.lavender} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.title}>Pending Dues</Text>
          <Text style={styles.amount}>₹{amount.toLocaleString()}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.payBtn} onPress={onPay}>
        <Text style={styles.payBtnText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: colors.shadow,
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.lavenderLight,
    justifyContent: 'space-between',
  },
  leftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  title: {
    color: colors.title,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 0,
  },
  amount: {
    color: colors.lavenderText,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 0,
  },
  payBtn: {
    backgroundColor: colors.lavender,
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});