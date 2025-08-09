import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTheme } from '../../../context/ThemeContext';
import { TopExpenseCategoryItem } from '../../../types/ReportTypes';
import { getTopExpenseCategories } from '../../../api/commonApi/reports';

export type TopExpensesBarChartProps = {
  companyId: string;
  year: number;
};

export default function TopExpensesBarChart({ companyId, year }: TopExpensesBarChartProps) {
  const { theme } = useTheme();
  const [items, setItems] = useState<TopExpenseCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getTopExpenseCategories(companyId, year)
      .then(data => {
        if (mounted) setItems(data);
      })
      .catch(() => {
        if (mounted) setError('Failed to load expense items');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [companyId, year]);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" color={theme.colors.chartPrimary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={{ color: typeof theme.colors.error === 'string' ? theme.colors.error : '#EF4444' }}>
  {error}
</Text>
      </View>
    );
  }

  if (!items.length) {
    return (
      <View style={styles.card}>
        <Text style={{ color: theme.colors.textSecondary }}>No top expense data found.</Text>
      </View>
    );
  }

  // Use only theme colors for chart bars
  const palette = Array.isArray(theme.colors.chartPalette) 
    ? theme.colors.chartPalette 
    : [theme.colors.chartPrimary || '#189e8a'];

  const chartData = items.map((item, idx) => ({
    value: item.totalExpense,
    label: item.accountName,
    frontColor: palette[idx % palette.length], // cycle through palette
  }));

  return (
    <View style={styles.card}>
      <Text style={[styles.title, { color: theme.colors.chartPrimary }]}>{`Top 10 Expense Items`}</Text>
    <BarChart
  data={chartData}
  barWidth={16}
  horizontal
  xAxisLabelTextStyle={{ fontSize: 12, color: theme.colors.textSecondary }}
  noOfSections={4}
  maxValue={Math.max(...chartData.map(i => i.value), 1) * 1.2}
  barBorderRadius={4}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 12,
    // color will be overridden by theme
  },
});