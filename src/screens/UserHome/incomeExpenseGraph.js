import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const { width: screenWidth } = Dimensions.get("window");
const cardWidth = screenWidth - 36;
const chartWidth = cardWidth;

const chartHeight = 180;
const xAxisLabelsHeight = 25;

const colors = {
  lavender: "#7B61FF",
  lavenderLight: "#F3EEFC",
  expense: "#F3A712",
  income: "#7B61FF",
  textSecondary: "#6D6D7A",
};

function abbreviateYAxis(num) {
  if (num >= 10000000) return (num / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
  if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  if (num >= 1000) return (num / 1000).toFixed(0) + "k";
  return num?.toString();
}

export default function IncomeExpenseLineGraph({
  incomeData = [],
  expenseData = [],
  xLabels = [],
}) {
  const maxYValue = Math.max(...incomeData, ...expenseData, 0) * 1.2;

  return (
    <View style={styles.graphCard}>
      <View style={styles.graphLegendRow}>
        <View style={[styles.legendDot, { backgroundColor: colors.income }]} />
        <Text style={styles.legendLabel}>Income</Text>
        <View style={[styles.legendDot, { backgroundColor: colors.expense }]} />
        <Text style={styles.legendLabel}>Expense</Text>
      </View>
      <View style={styles.chartWrap}>
        <LineChart
                      spacing={120}

          data={incomeData.map((v, i) => ({
            value: v,
            label: xLabels[i],
            dataPointText: abbreviateYAxis(v),
            color: colors.income,
          }))}
          data2={expenseData.map((v, i) => ({
            value: v,
            label: xLabels[i],
            dataPointText: abbreviateYAxis(v),
            color: colors.expense,
          }))}
          curved
          areaChart
          startFillColor={colors.lavender}
          endFillColor={colors.lavenderLight}
          startOpacity={0.13}
          endOpacity={0.02}
          color={colors.income}
          color2={colors.expense}
          thickness={2.2}
          thickness2={2.2}
          rulesColor="transparent"
          rulesThickness={0}
          xAxisLabelTextStyle={{
            color: colors.textSecondary,
            fontWeight: "bold",
            fontSize: 13,
            marginTop: 4,
          }}
          yAxisTextStyle={{ color: colors.textSecondary, fontSize: 13 }}
          xAxisColor="transparent"
          yAxisColor="transparent"
          noOfSections={4}
          hideDataPoints={false}
          dataPointsColor={colors.income}
          dataPointsColor2={colors.expense}
          showPointerStrip={true}
          pointerStripColor="#C6BAE6"
          pointerConfig={{
            pointerStripHeight: 120,
            pointerColor: colors.income,
            pointerLabelWidth: 64,
            pointerStripUptoDataPoint: true,
            pointerLabelComponent: (point) => (
              <View style={styles.pointerLabelBubble}>
                <Text style={styles.pointerLabelText}>{abbreviateYAxis(point.value)}</Text>
              </View>
            ),
          }}
          xAxisLabelTexts={xLabels}
          xAxisLabelsHeight={xAxisLabelsHeight}
          hideRules={true}
          maxValue={maxYValue}
          minValue={0}
          
          dataPointsShape="circle"
          dataPointsRadius={4}
          dataPointsWidth={4}
          dataPointsHeight={4}
          showVerticalLines={false}
          pointerStripDashArray={[6, 4]}
          formatYLabel={abbreviateYAxis}
       
         customDataPoint={(point, idx) => (
            <View style={[styles.graphDot, { backgroundColor: colors.income }]} />
          )}
          customDataPoint2={(point, idx) => (
            <View style={[styles.graphDot2, { backgroundColor: colors.expense }]} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: "#F3EEFC",
    shadowColor: "#A78BFA",
    shadowRadius: 8,
    shadowOpacity: 0.09,
    elevation: 2,
     width: cardWidth + 8,
    alignSelf: "center",
    marginBottom: 24,
    minHeight: chartHeight + xAxisLabelsHeight + 20,
    justifyContent: "center",
  },
  chartWrap: {
    width: chartWidth -8,
    minHeight: chartHeight,
    alignSelf: "center",
    justifyContent: "center",
    marginLeft: 0,
    paddingBottom: 0,
  },
  graphLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
    marginTop: 2,
    alignSelf: "center",
  },
  legendDot: {
    width: 12,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  legendLabel: {
    color: colors.textSecondary,
    fontWeight: "500",
    fontSize: 13,
    marginRight: 12,
    marginLeft: 2,
  },
  graphDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.income,
    opacity: 0.7,
  },
  graphDot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.expense,
    opacity: 0.7,
  },
  pointerLabelBubble: {
    backgroundColor: colors.lavender,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    elevation: 2,
    marginBottom: 8,
    alignSelf: "center",
  },
  pointerLabelText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 150, 

  },
});
