import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Transaction, Summary } from "../types/Transaction";
import { api } from "../api/api";

interface TransactionContextType {
  transactions: Transaction[];
  summary: Summary;
  balance: number;
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
  fetchBalance: () => Promise<void>;
  fetchSummary: (params: {
    year?: string;
    month?: string;
    date?: string;
  }) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, "_id">) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  searchTransactions: (type?: string, date?: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalIncome: 0,
    totalExpense: 0,
  });
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch transactions on initial load
  useEffect(() => {
    fetchTransactions();
    fetchBalance();
    // Default summary for current month
    const now = new Date();
    const currentYear = now.getFullYear().toString();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    fetchSummary({ year: currentYear, month: currentMonth });
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await api.getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      const data = await api.getBalance();
      setBalance(data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const fetchSummary = async (params: {
    year?: string;
    month?: string;
    date?: string;
  }) => {
    try {
      const data = await api.getSummary(params);
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const addTransaction = async (transaction: Omit<Transaction, "_id">) => {
    try {
      await api.addTransaction(transaction);
      // Refresh data after adding
      await fetchTransactions();
      await fetchBalance();
      await fetchSummary({
        year: new Date(transaction.date).getFullYear().toString(),
        month: (new Date(transaction.date).getMonth() + 1)
          .toString()
          .padStart(2, "0"),
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await api.deleteTransaction(id);
      // Refresh data after deleting
      await fetchTransactions();
      await fetchBalance();
      // For summary, use current date since we don't know the deleted transaction's date
      const now = new Date();
      await fetchSummary({
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString().padStart(2, "0"),
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const searchTransactions = async (type?: string, date?: string) => {
    setIsLoading(true);
    try {
      const results = await api.searchTransactions(type, date);
      setTransactions(results);
    } catch (error) {
      console.error("Error searching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    transactions,
    summary,
    balance,
    isLoading,
    fetchTransactions,
    fetchBalance,
    fetchSummary,
    addTransaction,
    deleteTransaction,
    searchTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};
