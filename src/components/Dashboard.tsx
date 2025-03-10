import React, { useState, useEffect } from "react";
import { useTransactions } from "../context/TransactionContext";
import { api } from "../api/api";

const Dashboard: React.FC = () => {
  const { balance, summary, fetchBalance, fetchSummary, transactions } =
    useTransactions();
  const [filterMonth, setFilterMonth] = useState<string>(
    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(
      2,
      "0"
    )}`
  );

  // Fetch ข้อมูลใหม่เมื่อ filterMonth หรือ transactions มีการเปลี่ยนแปลง
  useEffect(() => {
    const [year, month] = filterMonth.split("-");
    fetchBalance();
    fetchSummary({ year, month });
  }, [filterMonth, transactions]); // **เพิ่ม transactions ใน dependency array**
  // ฟังก์ชันดาวน์โหลด Excel
  const handleExportExcel = async () => {
    try {
      await api.exportExcel();
      alert("ดาวน์โหลดไฟล์ Excel สำเร็จ!");
    } catch (error) {
      console.error("Error exporting Excel:", error);
      alert("เกิดข้อผิดพลาดในการดาวน์โหลดไฟล์ Excel");
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">แผงควบคุม</h2>

      {/* ฟิลเตอร์เดือน */}
      <div className="mb-4">
        <label className="block mb-2">เดือน</label>
        <input
          type="month"
          className="p-2 border rounded-md"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        />
      </div>

      {/* แสดงข้อมูลยอดคงเหลือ, รายรับ, รายจ่าย */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">ยอดคงเหลือ</h3>
          <p
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {balance.toLocaleString()} บาท
          </p>
        </div>

        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">รายรับรวม</h3>
          <p className="text-2xl font-bold text-green-600">
            {summary.totalIncome.toLocaleString()} บาท
          </p>
        </div>

        <div className="bg-red-100 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">รายจ่ายรวม</h3>
          <p className="text-2xl font-bold text-red-600">
            {summary.totalExpense.toLocaleString()} บาท
          </p>
        </div>
      </div>

      {/* ปุ่มดาวน์โหลด Excel */}
      <button
        onClick={handleExportExcel}
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        ดาวน์โหลดรายงาน Excel
      </button>
    </div>
  );
};

export default Dashboard;
