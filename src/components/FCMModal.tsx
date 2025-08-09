import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {visitorApprove, visitorReject} from '../api/myHome/visitorLog';
import Logger from '../utils/logger';

const {width} = Dimensions.get('window');

interface FCMModalProps {
  visible: boolean;
  title: string;
  body: string;
  guestId?: string;
  onClose: () => void;
}

const FCMModal: React.FC<FCMModalProps> = ({visible, title, body, guestId, onClose}) => {
  const onApprove = async () => {
    if (!guestId) {
      Alert.alert('Error', 'No guest ID provided');
      Logger.error('No guest ID provided for approval');
      return;
    }
    
    const visitorId = {
      visitorLogId: guestId,
    };
    Logger.debug('Approving visitor', { visitorId });
    try {
      await visitorApprove(visitorId);
      Alert.alert('Success', 'Visitor Approved');
      Logger.info('Visitor approved successfully', { guestId });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to approve visitor');
      Logger.error('Failed to approve visitor', error, { guestId });
    }
  };

  const onReject = async () => {
    if (!guestId) {
      Alert.alert('Error', 'No guest ID provided');
      Logger.error('No guest ID provided for rejection');
      return;
    }
    
    const visitorId = {
      visitorLogId: guestId,
    };
    Logger.debug('Rejecting visitor', { visitorId });
    try {
      await visitorReject(visitorId);
      Alert.alert('Success', 'Visitor Rejected');
      Logger.info('Visitor rejected successfully', { guestId });
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to reject visitor');
      Logger.error('Failed to reject visitor', error, { guestId });
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subText}>{body}</Text>

          <View style={styles.actions}>
            <View style={styles.actionItem}>
              <TouchableOpacity style={styles.circleBtnRed} onPress={onReject}>
                <FontAwesomeIcon icon={faTimes} size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.actionText}>Deny</Text>
            </View>

            <View style={styles.actionItem}>
              <TouchableOpacity
                style={styles.circleBtnGreen}
                onPress={onApprove}>
                <FontAwesomeIcon icon={faCheck} size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.actionText}>Approve</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 22,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },

  iconBadge: {
    backgroundColor: '#f1f1f1',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconImage: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    color: '#2d2d2d', // charcoal
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  subText: {
    fontSize: 15,
    color: '#5e5e5e', // soft gray
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2e2e2e', // charcoal
  },
  company: {
    fontSize: 13,
    color: '#888', // muted text
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 14,
    padding: 12,
    width: '100%',
    marginBottom: 28,
  },
  profilePic: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionItem: {
    alignItems: 'center',
  },
  circleBtnGreen: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#27ae60',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
  },
  circleBtnRed: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
});

export default FCMModal;
