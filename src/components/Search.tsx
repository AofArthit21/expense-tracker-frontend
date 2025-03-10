import React, { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

const Search: React.FC = () => {
  const { searchTransactions, fetchTransactions } = useTransactions();
  const [type, setType] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchTransactions(type || undefined, date || undefined);
  };

  const handleReset = async () => {
    setType("");
    setDate("");
    await fetchTransactions();
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">ค้นหารายการ</h2>
      <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-2">ประเภท</label>
          <select
            className="w-full p-2 border rounded-md"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">ทั้งหมด</option>
            <option value="income">รายรับ</option>
            <option value="expense">รายจ่าย</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block mb-2">วันที่</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-2 w-full md:w-auto">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            ค้นหา
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
          >
            รีเซ็ต
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
