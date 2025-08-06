import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUserCircle,
  faBell,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';
import { residentTheme } from '../../../commonStyles/residentTheme';

const WelcomeHeader = ({
  greeting,
  userName,
  unitNumber,
  onProfilePress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        {/* Left side - Greeting and User Info */}
        <View style={styles.leftContent}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.unitNumber}>Unit {unitNumber}</Text>
        </View>

        {/* Right side - Actions */}
        <View style={styles.rightContent}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <FontAwesomeIcon
              icon={faBell}
              size={20}
              color={residentTheme.colors.textSecondary}
            />
            {/* Notification badge */}
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.profileButton]}
            onPress={onProfilePress}
            activeOpacity={0.7}
          >
            <View style={styles.avatarPlaceholder}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size={24}
                color={residentTheme.colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: residentTheme.spacing.lg,
    paddingTop: residentTheme.spacing.xl,
    paddingBottom: residentTheme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
  },
  greeting: {
    fontSize: residentTheme.typography.fontSize.body,
    fontFamily: residentTheme.typography.fontFamily.regular,
    color: residentTheme.colors.textSecondary,
    marginBottom: residentTheme.spacing.xs,
    letterSpacing: 0.5,
  },
  userName: {
    fontSize: residentTheme.typography.fontSize.hero,
    fontFamily: residentTheme.typography.fontFamily.bold,
    color: residentTheme.colors.textPrimary,
    marginBottom: residentTheme.spacing.xs,
    letterSpacing: -1,
  },
  unitNumber: {
    fontSize: residentTheme.typography.fontSize.subheading,
    fontFamily: residentTheme.typography.fontFamily.medium,
    color: residentTheme.colors.textAccent,
    letterSpacing: 0.25,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: residentTheme.spacing.md,
  },
  actionButton: {
    padding: residentTheme.spacing.sm,
    borderRadius: residentTheme.layout.borderRadius.lg,
    marginLeft: residentTheme.spacing.sm,
    position: 'relative',
  },
  profileButton: {
    backgroundColor: residentTheme.colors.offWhite,
    ...residentTheme.layout.shadows.soft,
  },
  avatarPlaceholder: {
    ...residentTheme.components.avatar,
    backgroundColor: 'transparent',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: residentTheme.colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: residentTheme.typography.fontFamily.bold,
    color: residentTheme.colors.textInverse,
  },
});

export default WelcomeHeader;