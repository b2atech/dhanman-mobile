import { ExpenseBreakdownItem, ExpenseBreakdownResponse } from '../../types/expenseBreakdown';
import {fetcher} from '../../utils/axiosCommon';
import Logger from '../../utils/logger';

export const endpoints = {
  incomeExpenses: '/income-expenses-overview/',
  accountExpense: 'v1/accountExpenses',
  topExpenseCategories: 'v1/companies/{0}/top-expense-categories/{1}',
  expenseAccount: '/expenses-breakdown/',
  list: '/',
  company: 'v1/companies/',
};

export const useGetAccountOverview = async (
  companyId: string | number,
  periodType: string,
  finYearId: string | number,
) => {
  try {
    const url = `${endpoints.company}${companyId}${endpoints.incomeExpenses}${periodType}/${finYearId}`;
    Logger.apiCall('GET', url);
    Logger.debug('Fetching account overview', { companyId, periodType, finYearId });

    const response = await fetcher(url);
    Logger.debug('Account overview fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching Account Overview', error, { companyId, periodType, finYearId });
    throw error;
  }
};

export const useGetAccountExpense = async (companyId: string | number, accountNumber: string | number) => {
  try {
    const url = `${endpoints.accountExpense}${endpoints.list}${companyId}${endpoints.list}${accountNumber}`;
    Logger.apiCall('GET', url);
    Logger.debug('Fetching account expense', { companyId, accountNumber });

    const response = await fetcher(url);
    Logger.debug('Account expense fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching expense account', error, { companyId, accountNumber });
    throw error;
  }
};

export const useGetExpenseCategories = async (companyId: string | number, financialYearId: string | number) => {
  try {
    const url = endpoints.topExpenseCategories
      .replace('{0}', String(companyId))
      .replace('{1}', String(financialYearId));

    Logger.apiCall('GET', url);
    Logger.debug('Fetching expense categories', { companyId, financialYearId });

    const response = await fetcher(url);
    Logger.debug('Expense categories fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching expense categories', error, { companyId, financialYearId });
    throw error;
  }
};
export const getAccountExpenseOverviews = async (
  companyId: string | number,
  periodType: string,
  finYearId: string | number,
  period: string,
): Promise<ExpenseBreakdownItem[]> => {
  try {
    const url = `${endpoints.company}${companyId}${endpoints.expenseAccount}${finYearId}/${periodType}/${period}`;
    Logger.apiCall('GET', url);
    Logger.debug('Fetching account expense overview', { companyId, periodType, finYearId, period });

    const response = await fetcher(url);
    Logger.debug('Account expense overview fetched successfully', { count: response.items?.length });
    return response.items;
  } catch (error) {
    Logger.error('Error fetching account expense overview', error, { companyId, periodType, finYearId, period });
    throw error;
  }
};