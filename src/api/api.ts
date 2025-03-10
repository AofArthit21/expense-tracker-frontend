import axios from "axios";
import { Transaction } from "../types/Transaction";

const API_URL = "http://localhost:5000/api";

export const api = {
  // เพิ่มรายการ
  addTransaction: async (transaction: Omit<Transaction, "_id">) => {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
  },

  // แสดงรายการทั้งหมด
  getTransactions: async () => {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
  },

  // คำนวณยอดคงเหลือ
  getBalance: async () => {
    const response = await axios.get(`${API_URL}/transactions/balance`);
    return response.data;
  },

  // ค้นหารายการตามวันที่หรือประเภท
  searchTransactions: async (type?: string, date?: string) => {
    const response = await axios.get(`${API_URL}/transactions/search`, {
      params: { type, date },
    });
    return response.data;
  },

  // ลบรายการ
  deleteTransaction: async (id: string) => {
    const response = await axios.delete(`${API_URL}/transactions/${id}`);
    return response.data;
  },

  // ดาวน์โหลดรายงาน Excel
  exportExcel: () => {
    window.open(`${API_URL}/transactions/export`, "_blank");
  },

  // ดูสรุปรายรับรายจ่าย
  getSummary: async (params: {
    date?: string;
    month?: string;
    year?: string;
  }) => {
    const response = await axios.get(`${API_URL}/transactions/summary`, {
      params,
    });
    return response.data;
  },
};
