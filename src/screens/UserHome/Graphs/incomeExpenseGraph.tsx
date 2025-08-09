import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useTheme } from '../../../context/ThemeContext';
import { getIncomeExpensesOverview } from '../../../api/commonApi/reports';
// You must implement this API function as per your backend


function abbreviateYAxis(label: string): string {
  const num = Number(label);
  if (isNaN(num)) { return label; }
  if (num >= 10000000) { return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr'; }
  if (num >= 100000) { return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L'; }
  if (num >= 1000) { return (num / 1000).toFixed(0) + 'k'; }
  return num.toString();
}

export type IncomeExpenseLineGraphProps = {
  companyId: string;
  periodType: number;
  period: number;

};

export default function IncomeExpenseLineGraph({
  companyId,
  periodType,
  period
}: IncomeExpenseLineGraphProps) {
  const { theme } = useTheme();
  const { colors, components, spacing } = theme;

  // Palette usage for lines & dots
  const palette = Array.isArray(colors.chartPalette)
    ? colors.chartPalette
    : [colors.chartPrimary ?? '#189e8a', colors.chartSecondary ?? '#4eaeff'];

  // State for API data
  const [incomeData, setIncomeData] = useState<number[]>([]);
  const [expenseData, setExpenseData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  let mounted = true;
  setLoading(true);
  setError(null);
  getIncomeExpensesOverview(companyId, periodType, period)
    .then((items) => {
      if (mounted) {
        // Map the API result to chart-friendly arrays
        const incomeData = items.map(item => item.totalIncome);
        const expenseData = items.map(item => item.totalExpense);
        const xLabels = items.map(item => item.period);

        setIncomeData(incomeData);
        setExpenseData(expenseData);
        setXLabels(xLabels);
      }
    })
    .catch(() => {
      if (mounted) setError('Failed to load income/expense data');
    })
    .finally(() => {
      if (mounted) setLoading(false);
    });
  return () => { mounted = false; };
}, [companyId, periodType, period]);

  const maxYValue = Math.max(...incomeData, ...expenseData, 0) * 1.2;

  if (loading) {
    return (
      <View style={[components.card, styles.graphCard]}>
        <ActivityIndicator size="small" color={palette[0]} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={[components.card, styles.graphCard]}>
        <Text style={{ color: typeof colors.error === 'string' ? colors.error : '#EF4444' }}>{error}</Text>
      </View>
    );
  }
  if (!incomeData.length && !expenseData.length) {
    return (
      <View style={[components.card, styles.graphCard]}>
        <Text style={{ color: colors.textSecondary }}>No income/expense data found.</Text>
      </View>
    );
  }

  return (
    <View style={[components.card, styles.graphCard]}>
      <Text style={components.sectionTitle}>Income vs Expense</Text>
      <View style={styles.graphLegendRow}>
        <View style={[styles.legendDot, { backgroundColor: palette[0] }]} />
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Income</Text>
        <View style={[styles.legendDot, { backgroundColor: palette[1] }]} />
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>Expense</Text>
      </View>
      <View style={styles.chartWrap}>
        <LineChart
          spacing={120}
          data={incomeData.map((v, i) => ({
            value: v,
            label: xLabels[i],
            dataPointText: abbreviateYAxis(v.toString()),
            color: palette[0],
          }))}
          data2={expenseData.map((v, i) => ({
            value: v,
            label: xLabels[i],
            dataPointText: abbreviateYAxis(v.toString()),
            color: palette[1],
          }))}
          curved
          areaChart
          startFillColor={palette[0]}
          endFillColor={colors.surface}
          startOpacity={0.13}
          endOpacity={0.02}
          color={palette[0]}
          color2={palette[1]}
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
          dataPointsColor={palette[0]}
          dataPointsColor2={palette[1]}
          pointerConfig={{
            pointerStripHeight: 120,
            pointerColor: palette[0],
            pointerLabelWidth: 64,
            pointerStripUptoDataPoint: true,
            // pointerLabelComponent: (point: { value: number }) => (
            //   <View style={[styles.pointerLabelBubble, { backgroundColor: palette[0] }]}>
            //     <Text style={styles.pointerLabelText}>{abbreviateYAxis(point.value.toString())}</Text>
            //   </View>
            // ),
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
          customDataPoint={(_point: any, idx: number) => (
            <View style={[styles.graphDot, { backgroundColor: idx === 1 ? palette[1] : palette[0] }]} />
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