export interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  date: string;
}

export interface Summary {
  totalIncome: number;
  totalExpense: number;
}
