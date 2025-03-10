import React, { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

const TransactionForm: React.FC = () => {
  const { addTransaction } = useTransactions();
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTransaction({ type, amount, date });
      // Reset form after successful submission
      setAmount(0);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">เพิ่มรายการใหม่</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">ประเภท</label>
          <select
            className="w-full p-2 border rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">จำนวนเงิน</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">วันที่</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          บันทึก
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
