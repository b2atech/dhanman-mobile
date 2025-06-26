import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {VictoryPie} from 'victory-native';
import useConfig from '../../../hooks/useConfig';
import {useGetAccountExpense} from '../../../api/myHome/financeReports';
import commonStyles from '../../../commonStyles/commonStyles';

const screenWidth = Dimensions.get('window').width;

export default function ExpenseBreakdownChart() {
  const organization = useConfig();
  const [chartHistory, setChartHistory] = useState([]);
  const [currentChartData, setCurrentChartData] = useState({
    labels: [],
    series: [],
    parentAccountNumber: '50000',
  });
  const [selectedAccountNumber, setSelectedAccountNumber] = useState('50000');

  // Currency formatting function
  const formatCurrency = value => {
    return `₹${value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Handle slice click to navigate deeper into expense accounts
  const onPieSliceClick = accountNumber => {
    setChartHistory(prev => [
      ...prev,
      {...currentChartData, parentAccountNumber: selectedAccountNumber},
    ]);
    setSelectedAccountNumber(accountNumber);
  };

  // Update chart data from API response
  const updateChartData = data => {
    const labels = data.map(expense => expense.accountName);
    const series = data.map(expense => expense.totalExpense);
    setCurrentChartData({
      labels,
      series,
      parentAccountNumber: selectedAccountNumber,
    });
  };

  // Fetch data and update chart
  useEffect(() => {
    const fetchData = async () => {
      if (organization?.organizationId && selectedAccountNumber) {
        const accountExpense = await useGetAccountExpense(
          organization?.organizationId,
          selectedAccountNumber,
        );
        if (accountExpense) {
          updateChartData(accountExpense);
        }
      }
    };
    fetchData();
  }, [selectedAccountNumber]);

  const handleBack = () => {
    if (chartHistory.length > 0) {
      const previousChartData = chartHistory[chartHistory.length - 1];
      setChartHistory(prev => prev.slice(0, -1));
      setCurrentChartData(previousChartData);
      setSelectedAccountNumber(previousChartData.parentAccountNumber);
    }
  };

  const totalExpense = currentChartData.series.reduce(
    (acc, val) => acc + val,
    0,
  );

  const getPercentage = value => ((value / totalExpense) * 100).toFixed(1);

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

  return (
    <ScrollView style={styles.container}>
      {/* Expense Header */}
      <View style={styles.statsContainer}>
        <Text style={commonStyles.headerText}>Total Expense</Text>
        <Text style={commonStyles.descriptionText}>
          {formatCurrency(totalExpense)}
        </Text>
      </View>

      {/* Back Button */}
      {chartHistory.length > 0 && (
        <Text style={styles.backButton} onPress={handleBack}>
          Back
        </Text>
      )}

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <VictoryPie
          data={currentChartData.series.map((value, index) => ({
            x: currentChartData.labels[index],
            y: value,
            label: `${getPercentage(value)}%`,
          }))}
          width={screenWidth * 1}
          height={screenWidth * 1}
          colorScale={colorScale}
          labelRadius={({innerRadius}) => innerRadius + 20}
          style={{
            labels: {fill: '#fff', fontSize: 10},
            data: {fillOpacity: 0.9, stroke: '#fff', strokeWidth: 2},
          }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPress: (evt, props) => {
                  const accountNumber = currentChartData.labels[props.index];
                  onPieSliceClick(accountNumber);
                },
              },
            },
          ]}
        />
      </View>

      <View style={styles.legendContainer}>
        {currentChartData.labels.map((label, index) => (
          <View key={label} style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                {backgroundColor: colorScale[index % colorScale.length]},
              ]}
            />
            <Text style={commonStyles.descriptionText}>
              {label} ({getPercentage(currentChartData.series[index])}%)
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    color: '#007BFF',
    fontSize: 16,
    marginBottom: 16,
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
