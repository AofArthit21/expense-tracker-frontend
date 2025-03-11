// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import TransactionForm from "./components/TransactionForm";
// import TransactionList from "./components/TransactionList";
// import Dashboard from "./components/Dashboard";
// import Search from "./components/Search";
// import Login from "./components/LoginPage";
// import Register from "./components/RegisterPage";
// import { TransactionProvider } from "./context/TransactionContext";

// // Simple auth check component
// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const isAuthenticated = localStorage.getItem("token") !== null;

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// // Main transactions layout
// const TransactionsLayout: React.FC = () => {
//   return (
//     <TransactionProvider>
//       <div className="min-h-screen bg-gray-100">
//         <header className="bg-blue-600 text-white p-4">
//           <div className="container mx-auto flex justify-between items-center">
//             <h1 className="text-2xl font-bold">ระบบบันทึกรายรับรายจ่าย</h1>
//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 window.location.href = "/login";
//               }}
//               className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
//             >
//               ออกจากระบบ
//             </button>
//           </div>
//         </header>

//         <main className="container mx-auto p-4">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1">
//               <TransactionForm />
//             </div>

//             <div className="lg:col-span-2">
//               <Dashboard />
//               <Search />
//               <TransactionList />
//             </div>
//           </div>
//         </main>

//         <footer className="bg-gray-200 p-4 mt-6">
//           <div className="container mx-auto text-center text-gray-600">
//             <p>&copy; 2025 ระบบบันทึกรายรับรายจ่าย</p>
//           </div>
//         </footer>
//       </div>
//     </TransactionProvider>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <TransactionsLayout />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Dashboard from "./components/Dashboard";
import Search from "./components/Search";
import Login from "./components/LoginPage";
import Register from "./components/RegisterPage";
import { TransactionProvider } from "./context/TransactionContext";

// Simple auth check component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Main transactions layout
const TransactionsLayout: React.FC = () => {
  return (
    <TransactionProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">ระบบบันทึกรายรับรายจ่าย</h1>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
            >
              ออกจากระบบ
            </button>
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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TransactionsLayout />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
