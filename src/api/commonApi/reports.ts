import { ExpenseCategorizationItem, IncomeExpensesOverviewItem, TopExpenseCategoryItem } from '../../types/ReportTypes';
import { fetcher, commonApiClient } from '../commonApi';


export const endpoints = {
  incomeExpensesOverview: 'v1/companies/{0}/income-expenses-overview/{1}/{2}',
  expensesCategorization: 'v1/companies/{0}/expenses-categorization/{1}/{2}',
  topExpenseCategories: 'v1/companies/{0}/top-expense-categories/{1}',
  // Add more endpoints here as your API grows
};

/**
 * Fetches the income-expenses overview for a company for a specific period.
 * @param companyId - UUID of the company
 * @param periodType - Integer period type (e.g. 1 for yearly, 2 for monthly, etc)
 * @param period - Integer period (e.g. 2024 for year, 7 for July)
 * @returns Promise with array of overview items
 */
export const getIncomeExpensesOverview = async (
  companyId: string,
  periodType: number,
  period: number
): Promise<IncomeExpensesOverviewItem[]> => {
  try {
    const url = endpoints.incomeExpensesOverview
      .replace('{0}', companyId)
      .replace('{1}', String(periodType))
      .replace('{2}', String(period));
    const response = await fetcher(url, commonApiClient);
    return response.items as IncomeExpensesOverviewItem[];
  } catch (error) {
    console.error('Error fetching income-expenses overview', error);
    throw error;
  }
};

export const getExpensesCategorization = async (
  companyId: string,
  month: number,
  year: number
): Promise<ExpenseCategorizationItem[]> => {
  try {
    const url = endpoints.expensesCategorization
      .replace('{0}', companyId)
      .replace('{1}', String(month))
      .replace('{2}', String(year));
    const response = await fetcher(url, commonApiClient);
    // Return only the array of main data, not the cursor
    return response.items as ExpenseCategorizationItem[];
  } catch (error) {
    console.error('Error fetching expenses categorization', error);
    throw error;
  }
};

/**
 * Fetches top expense categories for a company for the specified year.
 * @param companyId - The UUID of the company.
 * @param year - The year (e.g., 2024).
 * @returns Array of top expense categories.
 */
export const getTopExpenseCategories = async (
  companyId: string,
  year: number
): Promise<TopExpenseCategoryItem[]> => {
  try {
    const url = endpoints.topExpenseCategories
      .replace('{0}', companyId)
      .replace('{1}', String(year));
    const response = await fetcher(url, commonApiClient);
    // Return only the array of main data, not the cursor
    return response.items as TopExpenseCategoryItem[];
  } catch (error) {
    console.error('Error fetching top expense categories', error);
    throw error;
  }
};