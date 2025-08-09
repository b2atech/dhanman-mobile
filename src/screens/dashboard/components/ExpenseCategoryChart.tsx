import React, {useEffect, useState} from 'react';
import Logger from '../utils/logger';
import {Dimensions, StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
} from 'victory-native';
import {useGetaccountExpenseOverviews} from '../../../api/myHome/financeReports';
import useConfig from '../../../hooks/useConfig';
import commonStyles from '../../../commonStyles/commonStyles';

const screenWidth = Dimensions.get('window').width;

const ExpenseCategoryChart = () => {
  const {company, finYear} = useConfig();
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountExpensesOverview = await useGetaccountExpenseOverviews(
          company?.id,
          2,
          finYear.id,
          1,
        );
        Logger.debug(accountExpensesOverview);
        if (accountExpensesOverview && accountExpensesOverview.length > 0) {
          const data = accountExpensesOverview;

          const uniquePeriods = Array.from(
            new Set(data.map(item => `${item.period} ${item.year}`)),
          );
          setCategories(uniquePeriods);

          const groupedByAccount = data.reduce((acc, curr) => {
            const period = `${curr.period} ${curr.year}`;
            if (!acc[curr.accountName]) {
              acc[curr.accountName] = Array(uniquePeriods.length).fill(0);
            }
            const periodIndex = uniquePeriods.indexOf(period);
            if (periodIndex !== -1) {
              acc[curr.accountName][periodIndex] = curr.totalExpense;
            }
            return acc;
          }, {});

          const formattedData = Object.keys(groupedByAccount).map(
            accountName => ({
              accountName,
              data: groupedByAccount[accountName].map((yValue, index) => ({
                x: uniquePeriods[index],
                y: yValue,
              })),
            }),
          );

          setChartData(formattedData);
        }
      } catch (err) {
        Logger.error('Error fetching expense data:', err);
      }
    };

    fetchData();
  }, []);

  if (chartData.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading chart data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={Dimensions.get('window').width * 0.95}
        height={300}>
        {/* Y Axis */}
        <VictoryAxis />
        {/* X Axis */}
        <VictoryAxis dependentAxis tickFormat={t => `${t / 1000}K`} />
        <VictoryStack horizontal>
          {chartData.map((dataset, i) => (
            <VictoryBar
              key={i}
              data={dataset.data}
              style={{
                data: {fill: colors[i % colors.length]},
              }}
            />
          ))}
        </VictoryStack>
      </VictoryChart>

      <View style={styles.legendContainer}>
        {chartData.map((dataset, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                {backgroundColor: colors[index % colors.length]},
              ]}
            />
            <Text style={commonStyles.descriptionText}>
              {dataset.accountName}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const colors = [
  '#2196F3',
  '#F44336',
  '#4CAF50',
  '#FF5722',
  '#9C27B0',
  '#00BCD4',
  '#FFC107',
  '#795548',
  '#607D8B',
  '#FF5733',
  '#ffca28',
  '#e91e63',
  '#26a69a',
  '#7e57c2',
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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

export default ExpenseCategoryChart;
