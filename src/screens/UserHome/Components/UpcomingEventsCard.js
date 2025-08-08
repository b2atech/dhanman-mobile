import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { residentTheme } from '../../../commonStyles/residentTheme';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth - (residentTheme.spacing.lg * 2);

const UpcomingEventsCard = ({ events }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderEventItem = (event, index) => (
    <TouchableOpacity
      key={event.id}
      style={[
        styles.eventItem,
        index === events.length - 1 && styles.lastEventItem,
      ]}
      activeOpacity={0.7}
    >
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <FontAwesomeIcon
            icon={faChevronRight}
            size={12}
            color={residentTheme.colors.textTertiary}
          />
        </View>

        <View style={styles.eventDetails}>
          <View style={styles.eventDetailItem}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size={12}
              color={residentTheme.colors.textTertiary}
            />
            <Text style={styles.eventDetailText}>
              {formatDate(event.date)}
            </Text>
          </View>

          <View style={styles.eventDetailItem}>
            <FontAwesomeIcon
              icon={faClock}
              size={12}
              color={residentTheme.colors.textTertiary}
            />
            <Text style={styles.eventDetailText}>
              {event.time}
            </Text>
          </View>

          <View style={styles.eventDetailItem}>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size={12}
              color={residentTheme.colors.textTertiary}
            />
            <Text style={styles.eventDetailText}>
              {event.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!events || events.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.emptyState}>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size={32}
              color={residentTheme.colors.textTertiary}
            />
            <Text style={styles.emptyText}>No upcoming events</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.eventsContainer}>
          {events.map((event, index) => renderEventItem(event, index))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: residentTheme.spacing.lg,
    marginBottom: residentTheme.spacing.lg,
  },
  card: {
    ...residentTheme.components.card,
    width: cardWidth,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: residentTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: residentTheme.typography.fontSize.title,
    fontFamily: residentTheme.typography.fontFamily.semiBold,
    color: residentTheme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  viewAllText: {
    fontSize: residentTheme.typography.fontSize.subheading,
    fontFamily: residentTheme.typography.fontFamily.medium,
    color: residentTheme.colors.textAccent,
    letterSpacing: 0.25,
  },
  eventsContainer: {
    marginTop: -residentTheme.spacing.sm,
  },
  eventItem: {
    paddingVertical: residentTheme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: residentTheme.colors.borderPrimary,
  },
  lastEventItem: {
    borderBottomWidth: 0,
  },
  eventContent: {
    flex: 1,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: residentTheme.spacing.sm,
  },
  eventTitle: {
    fontSize: residentTheme.typography.fontSize.heading,
    fontFamily: residentTheme.typography.fontFamily.semiBold,
    color: residentTheme.colors.textPrimary,
    letterSpacing: 0.25,
    flex: 1,
  },
  eventDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: residentTheme.spacing.md,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: residentTheme.spacing.md,
  },
  eventDetailText: {
    fontSize: residentTheme.typography.fontSize.caption,
    fontFamily: residentTheme.typography.fontFamily.regular,
    color: residentTheme.colors.textSecondary,
    marginLeft: residentTheme.spacing.xs,
    letterSpacing: 0.25,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: residentTheme.spacing.xl,
  },
  emptyText: {
    fontSize: residentTheme.typography.fontSize.subheading,
    fontFamily: residentTheme.typography.fontFamily.regular,
    color: residentTheme.colors.textTertiary,
    marginTop: residentTheme.spacing.sm,
    letterSpacing: 0.25,
  },
});

export default UpcomingEventsCard;
