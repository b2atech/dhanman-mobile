export interface ExpenseBreakdownItem {
  accountId: string;
  accountName: string;
  accountNumber: string;
  totalExpense: number;
}

export interface ExpenseBreakdownResponse {
  items: ExpenseBreakdownItem[];
  cursor: string;
}