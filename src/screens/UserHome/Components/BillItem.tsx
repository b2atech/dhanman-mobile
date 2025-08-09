import React, { useState } from 'react';
import Logger from '../utils/logger';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import {
  updateBillSendForApproval,
  updateBillApprove,
  updateBillReject,
} from '../../../api/purchase/bill';
import commonStyles from '../../../commonStyles/commonStyles';

const BillItem = ({
  bill,
  isExpanded,
  isChecked,
  onToggleExpand,
  onToggleCheck,
  company,
  finYearId,
  billType,
  onStatusChange,
}) => {
  const [localStatus, setLocalStatus] = useState(bill.billStatus);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(
      date.getMonth() + 1
    ).padStart(2, '0')}-${date.getFullYear()}`;
  };

  const handleStatusUpdate = async (apiFunc, newStatus, setLoadingFn) => {
    setLoadingFn(true);

    const payload = {
      billIds: [bill.id],
      companyId: company.id,
    };

    Logger.debug('Sending payload to API:', {
      ...payload,
      finYearId,
      billType,
    });

    try {
      await apiFunc(payload, finYearId, billType);
      setLocalStatus(newStatus);
      onStatusChange(bill.id, newStatus);
    } catch (err) {
      Logger.error(`${newStatus} failed`, err);
    } finally {
      setLoadingFn(false);
    }
  };

  const renderActionButton = () => {
    if (!isChecked) {return null;}

    const buttons = [];

    if (localStatus.toLowerCase() === 'pending approval') {
      buttons.push(
        <ActionButton
          key="approve"
          label="Approve"
          onPress={() =>
            handleStatusUpdate(updateBillApprove, 'Approved', setLoadingApprove)
          }
          loading={loadingApprove}
        />,
        <ActionButton
          key="reject"
          label="Reject"
          onPress={() =>
            handleStatusUpdate(updateBillReject, 'Rejected', setLoadingReject)
          }
          loading={loadingReject}
        />
      );
    } else if (localStatus.toLowerCase() === 'draft') {
      buttons.push(
        <ActionButton
          key="send"
          label="Send for Approval"
          onPress={() =>
            handleStatusUpdate(
              updateBillSendForApproval,
              'Pending Approval',
              setLoadingSend
            )
          }
          loading={loadingSend}
        />
      );
    }

    return <View style={styles.buttonRow}>{buttons}</View>;
  };

  const statusColor = (() => {
    const status = localStatus?.toLowerCase();
    if (['approved'].includes(status)) {return '#28a745';}
    if (['rejected', 'cancelled'].includes(status)) {return '#dc3545';}
    return '#000';
  })();

  return (
    <View style={styles.billCard}>
      <View style={styles.topRow}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={onToggleCheck}
            tintColors={{ true: '#3B6FD6', false: '#999' }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={styles.billTitle}>{bill.billType}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={styles.billAmount}>₹ {bill.totalAmount}</Text>
        </View>
        <TouchableOpacity onPress={onToggleExpand}>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            color="#3B6FD6"
            size={22}
          />
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <>
          <View style={styles.expandedContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoLabel}>Vendor</Text>
              <Text style={[styles.infoLabel, { flex: 0.5 }]}>Status</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoValue}>{formatDate(bill.billDate)}</Text>
              <Text style={[styles.infoValue, { marginLeft: 50 }]}>
                {bill.vendorName}
              </Text>
              <Text
                style={[
                  styles.infoValue,
                  {
                    color: statusColor,
                    fontWeight: 'bold',
                    marginLeft: 35,
                  },
                ]}
              >
                {localStatus}
              </Text>
            </View>
          </View>

          <View style={styles.buttonRow}>{renderActionButton()}</View>
        </>
      )}
    </View>
  );
};

const ActionButton = ({ label, onPress, loading }) => (
  <TouchableOpacity
    style={styles.actionButton}
    onPress={onPress}
    disabled={loading}
  >
    {loading ? (
      <ActivityIndicator color="#fff" />
    ) : (
      <Text style={styles.buttonText}>{label}</Text>
    )}
  </TouchableOpacity>
);

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

BillItem.propTypes = {
  bill: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onToggleExpand: PropTypes.func.isRequired,
  onToggleCheck: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  finYearId: PropTypes.number.isRequired,
  billType: PropTypes.number.isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  billCard: {
    ...commonStyles.shadow,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  billTitle: {
    ...commonStyles.headerText,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  billAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 10,
  },
  expandedContainer: {
    marginTop: 10,
  },
  infoRow: {
    ...commonStyles.flexDirectionRow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 5,
  },
  infoLabel: {
    flex: 1,
    fontWeight: '600',
    fontSize: 13,
    color: '#555',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25,
    marginTop: 10,
  },

  actionButton: {
    backgroundColor: '#3B6FD6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    ...commonStyles.fontPoppins,
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default BillItem;
