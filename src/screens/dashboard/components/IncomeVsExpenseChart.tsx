import React, {useState, useEffect} from 'react';
import Logger from '../../../utils/logger';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryGroup,
} from 'victory-native';
import {Checkbox} from 'react-native-paper';
import {useGetAccountOverview} from '../../../api/myHome/financeReports';
import useConfig from '../../../hooks/useConfig';
import commonStyles from '../../../commonStyles/commonStyles';

const IncomeVsExpenseChart = () => {
  const {company, finYear} = useConfig();
  const [income, setIncome] = useState(true);
  const [expense, setExpense] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Updated colors to match the image
  const incomeColor = '#FFB900'; // Brighter Orange color for income
  const expenseColor = '#007AFF'; // Saturated Blue color for expense

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await useGetAccountOverview(
  //         company.organizationId,
  //         2,
  //         finYear.id,
  //       );
  //       setChartData(data);

  //       const incomeSum = data.reduce((sum, item) => sum + item.totalIncome, 0);
  //       const expenseSum = data.reduce(
  //         (sum, item) => sum + item.totalExpense,
  //         0,
  //       );

  //       setTotalIncome(incomeSum);
  //       setTotalExpense(expenseSum);
  //     } catch (error) {
  //       Logger.error('Error fetching account data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [company]);

  // const labels = chartData.map(item => item.period);
  // const incomeData = chartData.map(item => ({
  //   x: item.period,
  //   y: income ? item.totalIncome : 0,
  // }));
  // const expenseData = chartData.map(item => ({
  //   x: item.period,
  //   y: expense ? item.totalExpense : 0,
  // }));

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={commonStyles.headerText}>Income</Text>
          <Text style={commonStyles.descriptionText}>
            ₹
            {totalIncome % 1 === 0
              ? `${totalIncome / 1000}K`
              : `${(totalIncome / 1000).toFixed(1)}K`}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={commonStyles.headerText}>Expense</Text>
          <Text style={commonStyles.descriptionText}>
            ₹
            {totalExpense % 1 === 0
              ? `${totalExpense / 1000}K`
              : `${(totalExpense / 1000).toFixed(1)}K`}
          </Text>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox.Item
          label="Income"
          status={income ? 'checked' : 'unchecked'}
          onPress={() => setIncome(!income)}
          color={incomeColor}
        />
        <Checkbox.Item
          label="Expense"
          status={expense ? 'checked' : 'unchecked'}
          onPress={() => setExpense(!expense)}
          color={expenseColor}
        />
      </View>

      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={Dimensions.get('window').width * 0.95}>
        <VictoryAxis />
        <VictoryAxis dependentAxis tickFormat={t => `${t / 1000}K`} />
        <VictoryGroup offset={20} colorScale={[incomeColor, expenseColor]}>
          {/* <VictoryBar data={incomeData} cornerRadius={{top: 6, bottom: 6}} />
          <VictoryBar data={expenseData} cornerRadius={{top: 6, bottom: 6}} /> */}
        </VictoryGroup>
      </VictoryChart>
    </View>
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
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  descriptionText: {
    fontSize: 14,
  },
});

export default IncomeVsExpenseChart;
