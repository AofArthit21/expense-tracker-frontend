import React from "react";
import { useTransactions } from "../context/TransactionContext";

const TransactionList: React.FC = () => {
  const { transactions, deleteTransaction, isLoading } = useTransactions();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH");
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">รายการธุรกรรม</h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">กำลังโหลดข้อมูล...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">รายการธุรกรรม</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">ไม่มีรายการ</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">ประเภท</th>
                <th className="p-2 text-right">จำนวนเงิน</th>
                <th className="p-2 text-left">วันที่</th>
                <th className="p-2 text-center">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b">
                  <td className="p-2">
                    {transaction.type === "income" ? "รายรับ" : "รายจ่าย"}
                  </td>
                  <td
                    className={`p-2 text-right ${
                      transaction.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.amount.toLocaleString()}
                  </td>
                  <td className="p-2">{formatDate(transaction.date)}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => deleteTransaction(transaction._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
