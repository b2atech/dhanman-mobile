import {fetcher} from '../../utils/axiosCommon';

export const endpoints = {
  incomeExpenses: '/income-expenses-overview/',
  accountExpense: 'v1/accountExpenses',
  topExpenseCategories: 'v1/companies/{0}/top-expense-categories/{1}',
  expenseAccount: '/expenses-breakdown/',
  list: '/',
  company: 'v1/companies/',
};
export const useGetAccountOverview = async (
  companyId,
  periodType,
  finYearId,
) => {
  try {
    const url = `${endpoints.company}${companyId}${endpoints.incomeExpenses}${periodType}/${finYearId}`;
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching Account Overview', error);
    throw error;
  }
};

export const useGetAccountExpense = async (companyId, accountNumber) => {
  try {
    const url = `${endpoints.accountExpense}${endpoints.list}${companyId}${endpoints.list}${accountNumber}`;
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching expense account', error);
    throw error;
  }
};

export const useGetExpenseCategories = async (companyId, financialYearId) => {
  try {
    const url = endpoints.topExpenseCategories
      .replace('{0}', companyId)
      .replace('{1}', String(financialYearId));
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching expense categories', error);
    throw error;
  }
};

export const useGetaccountExpenseOverviews = async (
  companyId,
  periodType,
  finYearId,
  period,
) => {
  try {
    const url = `${endpoints.company}${companyId}${endpoints.expenseAccount}${finYearId}/${periodType}/${period}`;
    const response = await fetcher(url);
    return response.items;
  } catch (error) {
    console.error('Error fetching account expense overview', error);
    throw error;
  }
};
