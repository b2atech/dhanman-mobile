import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { residentTheme } from '../../../commonStyles/residentTheme';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - (residentTheme.spacing.lg * 2) - residentTheme.spacing.sm) / 2;

const QuickActionCard = ({ title, icon, color, onPress, index }) => {
  const animationDelay = index * 100; // Stagger animation

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            icon={icon}
            size={24}
            color={residentTheme.colors.lighterNavy}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 120,
    borderRadius: residentTheme.layout.borderRadius.lg,
    ...residentTheme.layout.shadows.soft,
    marginBottom: residentTheme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: residentTheme.spacing.sm,
    opacity: 0.9,
  },
  title: {
    fontSize: residentTheme.typography.fontSize.subheading,
    fontFamily: residentTheme.typography.fontFamily.semiBold,
    color: residentTheme.colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.25,
  },
});

export default QuickActionCard;