import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const { width: screenWidth } = Dimensions.get("window");
const maxCircles = 4;
const colors = {
  lavender: "#7B61FF",
  lavenderLight: "#F3EEFC",
  lavenderWhite: "#FBF9FF",
  white: "#FFFFFF",
  outBorder: "#E0E0E0",
  textPrimary: "#22223B",
  textSecondary: "#6D6D7A",
  timelineLine: "#DFDFF2",
};

// Main component
export default function TimelineVisitors({ visitors = [] }) {
  const visible = visitors.slice(0, maxCircles);
  const remaining = visitors.length - maxCircles;

  return (
    <View style={styles.timelineCard}>
      <Text style={styles.timelineTitle}>Today's Visitors</Text>
      <View style={styles.timelineRow}>
        {visible.map((v, idx) => (
          <React.Fragment key={v.id}>
            <View style={styles.timelineColumn}>
              <View
                style={[
                  styles.circle,
                  v.status === "in"
                    ? styles.circleActive
                    : styles.circleInactive,
                ]}
              >
                {v.photo ? (
                  <Image source={{ uri: v.photo }} style={styles.photo} />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size={22}
                    color={colors.lavender}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.timeText,
                  v.status === "in"
                    ? styles.timeTextActive
                    : styles.timeTextInactive,
                ]}
              >
                {v.time}
              </Text>
              <Text
                style={[
                  styles.statusText,
                  v.status === "in"
                    ? styles.timeTextActive
                    : styles.timeTextInactive,
                ]}
              >
                {v.status === "in" ? "entered" : "exited"}
              </Text>
            </View>
            {/* Draw line except after last visible */}
            {idx < visible.length - 1 && (
              <View style={styles.timelineLine} />
            )}
          </React.Fragment>
        ))}
        {remaining > 0 && (
          <>
            <View style={styles.timelineColumn}>
              <View style={[styles.circle, styles.circleMore]}>
                <Text style={styles.moreText}>+{remaining}</Text>
              </View>
              <Text style={styles.timeTextInactive}></Text>
              <Text style={styles.statusText}></Text>
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
    backgroundColor: colors.white,
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 0,
    marginBottom: 16,
    paddingTop: 13,
    paddingBottom: 13,
    paddingHorizontal: 16,
    shadowColor: colors.lavender,
    shadowRadius: 4,
    shadowOpacity: 0.08,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.lavenderLight,
  },
  timelineTitle: {
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 2,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
  },
  timelineColumn: {
    alignItems: "center",
    width: circleSize + 6,
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: 2,
    backgroundColor: colors.lavenderWhite,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
  circleActive: {
    borderColor: colors.lavender,
  },
  circleInactive: {
    borderColor: colors.outBorder,
    opacity: 0.6,
  },
  photo: {
    width: circleSize - 6,
    height: circleSize - 6,
    borderRadius: (circleSize - 6) / 2,
    resizeMode: "cover",
  },
  circleMore: {
    borderColor: colors.lavender,
    backgroundColor: colors.lavenderLight,
    alignItems: "center",
    justifyContent: "center",
  },
  moreText: {
    color: colors.lavender,
    fontWeight: "bold",
    fontSize: 13,
  },
  timelineLine: {
    width: 28,
    height: 2,
    backgroundColor: colors.timelineLine,
    alignSelf: "center",
    marginTop: circleSize / 2 - 1,
  },
  timeText: {
    fontSize: 12,
    marginTop: 2,
    marginBottom: -2,
  },
  timeTextActive: {
    color: colors.lavender,
    fontWeight: "bold",
  },
  timeTextInactive: {
    color: colors.textSecondary,
    opacity: 0.6,
  },
  statusText: {
    fontSize: 10,
    marginTop: 0,
    textTransform: "capitalize",
  },
});