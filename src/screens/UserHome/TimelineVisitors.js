import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');
const maxCircles = 4;

// Main component
export default function TimelineVisitors({ visitors = [] }) {
  const { theme } = useTheme();
  const { colors, components, spacing } = theme;

  const visible = visitors.slice(0, maxCircles);
  const remaining = visitors.length - maxCircles;

  return (
    <View style={[components.card, styles.timelineCard]}>
      <Text style={[components.sectionTitle, { color: colors.textTertiary }]}>
        Today's Visitors
      </Text>
      <View style={styles.timelineRow}>
        {visible.map((v, idx) => (
          <React.Fragment key={v.id}>
            <View style={styles.timelineColumn}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: colors.surface,
                    borderColor: v.status === 'in' ? colors.primary : colors.borderSecondary,
                    opacity: v.status === 'in' ? 1 : 0.6,
                  },
                ]}
              >
                {v.photo ? (
                  <Image source={{ uri: v.photo }} style={styles.photo} />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size={22}
                    color={colors.primary}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.timeText,
                  {
                    color: v.status === 'in' ? colors.primary : colors.textSecondary,
                    fontWeight: v.status === 'in' ? 'bold' : 'normal',
                    opacity: v.status === 'in' ? 1 : 0.6,
                  },
                ]}
              >
                {v.time}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  {
                    color: v.status === 'in' ? colors.primary : colors.textSecondary,
                    opacity: v.status === 'in' ? 1 : 0.6,
                  },
                ]}
              >
                {v.status === 'in' ? 'entered' : 'exited'}
              </Text>
            </View>
            {/* Draw line except after last visible */}
            {idx < visible.length - 1 && (
              <View style={[styles.timelineLine, { backgroundColor: colors.borderPrimary }]} />
            )}
          </React.Fragment>
        ))}
        {remaining > 0 && (
          <>
            <View style={styles.timelineColumn}>
              <View style={[
                styles.circle,
                {
                  borderColor: colors.primary,
                  backgroundColor: colors.surface,
                },
              ]}>
                <Text style={[styles.moreText, { color: colors.primary }]}>
                  +{remaining}
                </Text>
              </View>
              <Text style={styles.timeTextInactive} />
              <Text style={styles.statusText} />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const circleSize = 36;

const styles = StyleSheet.create({
  timelineCard: {
    // Card styling is handled by the components.card from theme
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    marginTop: 8,
  },
  timelineColumn: {
    alignItems: 'center',
    width: circleSize + 6,
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  photo: {
    width: circleSize - 6,
    height: circleSize - 6,
    borderRadius: (circleSize - 6) / 2,
    resizeMode: 'cover',
  },
  moreText: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  timelineLine: {
    width: 28,
    height: 2,
    alignSelf: 'center',
    marginTop: circleSize / 2 - 1,
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: -2,
  },
  timeTextInactive: {
    opacity: 0.6,
  },
  statusText: {
    fontSize: 10,
    marginTop: 0,
    textTransform: 'capitalize',
  },
});
