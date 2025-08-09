import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import { TimelineVisitorsProps } from './types';

const maxCircles = 4;

export default function TimelineVisitors({ visitors = [] }: TimelineVisitorsProps) {
  const { theme } = useTheme();
  const { colors, components } = theme;

  const visible = visitors.slice(0, maxCircles);
  const remaining = visitors.length - maxCircles;

  return (
    <View style={[components.card, styles.timelineCard]}>
      <Text style={styles.title}>
        Today's Visitors
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
                  {v.status === 'in' ? 'Entered' : 'Exited'}
                </Text>
              </View>
              {idx < visible.length - 1 && (
                <View style={[styles.timelineLine, { backgroundColor: colors.borderPrimary }]} />
              )}
            </React.Fragment>
          ))}
          {remaining > 0 && (
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
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const circleSize = 36;

const styles = StyleSheet.create({
  timelineCard: {
    paddingVertical: 8, // less vertical padding for compact card
    paddingHorizontal: 0, // outer left/right padding minimal
    marginVertical: 5, // less space above/below the card
    marginHorizontal: 5, // more horizontal space between cards
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
    color: '#189e8a',
    marginBottom: 2,
    opacity: 0.7,
    paddingLeft: 12, // add some left padding for title
    paddingTop: 2,
  },
  scrollContent: {
    paddingLeft: 10, // more left padding inside card
    paddingRight: 10, // more right padding inside card
    alignItems: 'center',
    minHeight: 64,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
  timelineColumn: {
    alignItems: 'center',
    width: circleSize + 9,
    minWidth: circleSize + 9,
    marginRight: 6,
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
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
    width: 18,
    height: 2,
    alignSelf: 'center',
    marginTop: circleSize / 2 - 1,
    marginLeft: -2,
    marginRight: -2,
    borderRadius: 1,
  },
  timeText: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 0,
    textAlign: 'center',
    minWidth: 34,
  },
  timeTextInactive: {
    opacity: 0.6,
  },
  statusText: {
    fontSize: 10,
    marginTop: 0,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
