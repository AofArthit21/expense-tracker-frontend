import React from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import { TransactionProvider } from "./context/TransactionContext";

const App: React.FC = () => {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">ระบบบันทึกรายรับรายจ่าย</h1>
          </div>
        </header>

        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <TransactionForm />
            </div>

            <div className="lg:col-span-2">
              <Dashboard />
              <Search />
              <TransactionList />
            </div>
          </div>
        </main>

        <footer className="bg-gray-200 p-4 mt-6">
          <div className="container mx-auto text-center text-gray-600">
            <p>&copy; 2025 ระบบบันทึกรายรับรายจ่าย</p>
          </div>
        </footer>
      </div>
    </TransactionProvider>
  );
};

export default App;
