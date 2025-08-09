import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useTheme } from '../../context/ThemeContext';
import IncomeExpenseLineGraph, { IncomeExpenseLineGraphProps } from './Graphs/incomeExpenseGraph';
import ExpensesPieChart, { ExpensesPieChartProps } from './Graphs/ExpensesPieChart';
import TopExpensesBarChart, { TopExpensesBarChartProps } from './Graphs/TopExpensesBarChart';


const { width: screenWidth } = Dimensions.get('window');

export type DashboardGraphsProps = {
  incomeExpense: IncomeExpenseLineGraphProps;
  expenseCategories: ExpensesPieChartProps;
  topExpenses: TopExpensesBarChartProps;
};

export default function DashboardGraphs({
  incomeExpense,
  expenseCategories,
  topExpenses,
}: DashboardGraphsProps) {
  const [page, setPage] = useState(0);
  const { theme } = useTheme();

  const pageCount = 3;

  // Pagination dot colors from theme
  const activeColor = theme.colors.chartPrimary || '#189e8a';
  const inactiveColor = theme.colors.borderPrimary || '#E4E4E7';

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        onPageSelected={e => setPage(e.nativeEvent.position)}
      >
        <View key="1">
          <IncomeExpenseLineGraph {...incomeExpense} />
        </View>
        <View key="2">
          <ExpensesPieChart {...expenseCategories} />
        </View>
        <View key="3">
          <TopExpensesBarChart {...topExpenses} />
        </View>
      </PagerView>
      <View style={styles.pagination}>
        {Array.from({ length: pageCount }).map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: page === i ? activeColor : inactiveColor,
                width: page === i ? 14 : 8,
                height: 8,
              },
            ]}
            activeOpacity={0.7}
            // Optionally, allow tap to switch page:
            // onPress={() => pagerRef.current?.setPage(i)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    minHeight: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pager: {
    width: screenWidth,
    height: 270,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    borderRadius: 4,
    marginHorizontal: 3,
  },
});