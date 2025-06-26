import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {useGetExpenseCategories} from '../../../api/myHome/financeReports';
import useConfig from '../../../hooks/useConfig';
import commonStyles from '../../../commonStyles/commonStyles';

const screenWidth = Dimensions.get('window').width;

const TopExpensesChart = () => {
  const {company, finYear} = useConfig();
  const [chartData, setChartData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const colorScale = [
    '#2196F3',
    '#F44336',
    '#4CAF50',
    '#FF5722',
    '#9C27B0',
    '#00BCD4',
    '#FFC107',
    '#795548',
    '#607D8B',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseCategories = await useGetExpenseCategories(
          company?.organizationId,
          finYear.id,
        );
        console.log(company?.organizationId);
        if (expenseCategories && expenseCategories.length > 0) {
          const formattedData = expenseCategories.map((item, index) => ({
            x: item.accountName,
            y: item.totalExpense,
            color: colorScale[index % colorScale.length],
          }));

          setChartData(formattedData);

          const expenseSum = expenseCategories.reduce(
            (sum, item) => sum + item.totalExpense,
            0,
          );
          setTotalExpense(expenseSum);
        }
      } catch (error) {
        console.error('Error fetching expense categories:', error);
      }
    };

    fetchData();
  }, [company?.id]);

  const formatCurrency = value => {
    return `₹${value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (chartData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading chart data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={commonStyles.headerText}>Top Expenses</Text>
        <Text style={commonStyles.descriptionText}>
          {formatCurrency(totalExpense)}
        </Text>
      </View>

      <VictoryChart
        theme={VictoryTheme.grayscale}
        width={screenWidth * 0.95}
        domainPadding={20}
        style={styles.chart}>
        <VictoryAxis tickFormat={1} />
        <VictoryAxis
          dependentAxis
          tickFormat={t => `${t / 1000}K`}
          style={{
            tickLabels: {fontSize: 12, padding: 5},
          }}
        />
        <VictoryBar
          data={chartData}
          horizontal
          cornerRadius={{top: 6}}
          style={{
            data: {
              fill: ({datum}) => datum.color,
              width: 20,
            },
          }}
        />
      </VictoryChart>

      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={item.x} style={styles.legendItem}>
            <View
              style={[styles.legendColorBox, {backgroundColor: item.color}]}
            />
            <Text style={commonStyles.descriptionText}>{item.x}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chart: {
    alignItems: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
});

export default TopExpensesChart;
