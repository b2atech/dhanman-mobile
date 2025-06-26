import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import IncomeVsExpenseChart from './components/IncomeVsExpenseChart';
import {Card} from 'react-native-paper';
import ExpenseBreakdownChart from './components/ExpenseBreakdownChart';
import TopExpensesChart from './components/TopExpensechart';
import ExpenseCategoryChart from './components/ExpenseCategoryChart';

const AnalyticEcommerce = ({
  title,
  count,
  percentage,
  isLoss,
  color,
  extra,
}) => (
  <Card style={styles.card}>
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.percentage}>
        {percentage}% {isLoss ? 'Decrease' : 'Increase'}
      </Text>
      <Text style={styles.extra}>{extra}</Text>
    </View>
  </Card>
);

const IncomeVsExpense = () => (
  <Card style={styles.card}>
    <Text style={styles.cardTitle}>Income vs Expense</Text>
    <IncomeVsExpenseChart />
  </Card>
);

const ExpenseBreakdownCard = () => (
  <Card style={styles.card}>
    <Text style={styles.cardTitle}>Expense Breakdown</Text>
    <ExpenseBreakdownChart />
  </Card>
);

const TopExpensesCard = () => (
  <Card style={styles.card}>
    <Text style={styles.cardTitle}>Top Expenses</Text>
    <TopExpensesChart />
  </Card>
);

const ExpenseCategoryCard = () => (
  <Card style={styles.card}>
    <Text style={styles.cardTitle}>Expense by Category</Text>
    <ExpenseCategoryChart />
  </Card>
);

const FinanceHome = () => {
  return (
    <ScrollView>
      <View style={styles.row}>
        <IncomeVsExpense />
      </View>

      <View style={styles.row}>
        <ExpenseBreakdownCard />
      </View>

      <View style={styles.row}>
        <TopExpensesCard />
      </View>

      <View style={styles.row}>
        <ExpenseCategoryCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 8,
    color: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  percentage: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  extra: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});

export default FinanceHome;
