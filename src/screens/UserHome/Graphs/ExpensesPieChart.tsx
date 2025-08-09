import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { useTheme } from '../../../context/ThemeContext';
import { TopExpenseCategoryItem } from '../../../types/ReportTypes';
import { getTopExpenseCategories } from '../../../api/commonApi/reports';

export type ExpensesPieChartProps = {
  companyId: string;
  year: number;
};

export default function ExpensesPieChart({ companyId, year }: ExpensesPieChartProps) {
  const { theme } = useTheme();
  const [data, setData] = useState<TopExpenseCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    getTopExpenseCategories(companyId, year)
      .then(items => {
        if (mounted) setData(items);
      })
      .catch(err => {
        if (mounted) setError('Failed to load expenses');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [companyId, year]);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="small" color="#189e8a" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.card}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.card}>
        <Text>No expense data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Expenses by Categories</Text>
      <PieChart
        data={data.map((item, idx) => ({
          value: item.totalExpense,
           color: theme.colors.chartPalette[idx % theme.colors.chartPalette.length],

          label: item.accountName,
        }))}
        radius={70}
        innerRadius={35}
        showText
        textColor="#333"
        textSize={13}
        labelsPosition="outward"
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
    color: '#189e8a',
  },
});