import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useTheme } from '../../context/ThemeContext';

const { width: screenWidth } = Dimensions.get('window');

function abbreviateYAxis(label: string): string {
  const num = Number(label);
  if (isNaN(num)) return label;
  if (num >= 10000000) return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
  if (num >= 100000) return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
  return num.toString();
}

export type IncomeExpenseLineGraphProps = {
  incomeData?: number[];
  expenseData?: number[];
  xLabels?: string[];
};

export default function IncomeExpenseLineGraph({
  incomeData = [],
  expenseData = [],
  xLabels = [],
}: IncomeExpenseLineGraphProps) {
  const { theme } = useTheme();
  const { colors, components, spacing } = theme;

  const maxYValue = Math.max(...incomeData, ...expenseData, 0) * 1.2;

  return (
    <View style={[components.card, styles.graphCard]}>
      <Text style={components.sectionTitle}>
        Income vs Expense
      </Text>
      <View style={styles.graphLegendRow}>
        <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Income</Text>
        <View style={[styles.legendDot, { backgroundColor: colors.secondary }]} />
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Expense</Text>
      </View>
      <View style={styles.chartWrap}>
        <LineChart
          spacing={120}
          data={incomeData.map((v, i) => ({
            value: v,
            label: xLabels[i],
            dataPointText: abbreviateYAxis(v.toString()),
            color: colors.primary,
          }))}
          data2={expenseData.map((v, i) => ({
            value: v,
            label: xLabels[i],
            dataPointText: abbreviateYAxis(v.toString()),
            color: colors.secondary,
          }))}
          curved
          areaChart
          startFillColor={colors.primary}
          endFillColor={colors.surface}
          startOpacity={0.13}
          endOpacity={0.02}
          color={colors.primary}
          color2={colors.secondary}
          thickness={2.2}
          thickness2={2.2}
          rulesColor="transparent"
          rulesThickness={0}
          xAxisLabelTextStyle={{
            color: colors.textSecondary,
            fontWeight: '500',
            fontSize: 13,
            marginTop: 4,
          }}
          yAxisTextStyle={{ color: colors.textSecondary, fontSize: 13 }}
          xAxisColor="transparent"
          yAxisColor="transparent"
          noOfSections={4}
          hideDataPoints={false}
          dataPointsColor={colors.primary}
          dataPointsColor2={colors.secondary}
          
          
          pointerConfig={{
            pointerStripHeight: 120,
            pointerColor: colors.primary,
            pointerLabelWidth: 64,
            pointerStripUptoDataPoint: true,
            pointerLabelComponent: (point: { value: number }) => (
              <View style={[styles.pointerLabelBubble, { backgroundColor: colors.primary }]}>
                <Text style={styles.pointerLabelText}>{abbreviateYAxis(point.value.toString())}</Text>
              </View>
            ),
          }}
          xAxisLabelTexts={xLabels}
          xAxisLabelsHeight={25}
          hideRules={true}
          maxValue={maxYValue}
          
          dataPointsShape="circle"
          dataPointsRadius={4}
          dataPointsWidth={4}
          dataPointsHeight={4}
          showVerticalLines={false}
          
          formatYLabel={abbreviateYAxis}
          customDataPoint={(_point: any, _idx: number) => (
            <View style={[styles.graphDot, { backgroundColor: colors.primary }]} />
          )}
         
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphCard: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  chartWrap: {
    width: '100%',
    minHeight: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  graphLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    marginTop: 8,
    alignSelf: 'center',
  },
  legendDot: {
    width: 12,
    height: 5,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  legendLabel: {
    fontWeight: '500',
    fontSize: 13,
    marginRight: 12,
    marginLeft: 2,
  },
  graphDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.7,
  },
  graphDot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.7,
  },
  pointerLabelBubble: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    elevation: 2,
    marginBottom: 8,
    alignSelf: 'center',
  },
  pointerLabelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});