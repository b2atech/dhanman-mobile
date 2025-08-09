
export type MonthlyExpenseItem = {
  period: string;           // e.g., "Jun 2024"
  year: number;
  totalIncome: number;
  totalExpense: number;
  actualIncome: number;
  actualExpense: number;
};

export type MonthlyExpenseResponse = {
  items: MonthlyExpenseItem[];
  cursor?: string;
};

export type TopExpenseCategoryItem = {
  accountId: string;
  accountName: string;
  accountNumber: string;
  totalExpense: number;
};

export type TopExpenseCategoriesResponse = {
  items: TopExpenseCategoryItem[];
  cursor?: string;
};

export type IncomeExpensesOverviewItem = {
  period: string;
  year: number;
  totalIncome: number;
  totalExpense: number;
  actualIncome: number;
  actualExpense: number;
};

export type ExpenseCategorizationItem = {
  period: string;
  year: number;
  accountId: string;
  accountName: string;
  totalExpense: number;
};
