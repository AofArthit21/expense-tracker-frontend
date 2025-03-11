import axios from "axios";
import { Transaction } from "../types/Transaction";

const API_URL = "http://localhost:5000/api";

// ดึง token จาก localStorage
const getAuthToken = () => localStorage.getItem("token");

// สร้าง axios instance พร้อม Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor เพื่อใส่ token อัตโนมัติ
axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // ✅ เพิ่มรายการ
  addTransaction: async (transaction: Omit<Transaction, "_id">) => {
    const response = await axiosInstance.post("/transactions", transaction);
    return response.data;
  },

  // ✅ แสดงรายการทั้งหมด
  getTransactions: async () => {
    const response = await axiosInstance.get("/transactions");
    return response.data;
  },

  // ✅ คำนวณยอดคงเหลือ
  getBalance: async () => {
    const response = await axiosInstance.get("/transactions/balance");
    return response.data;
  },

  // ✅ ค้นหารายการตามวันที่หรือประเภท
  searchTransactions: async (type?: string, date?: string) => {
    const response = await axiosInstance.get("/transactions/search", {
      params: { type, date },
    });
    return response.data;
  },

  // ✅ ลบรายการ
  deleteTransaction: async (id: string) => {
    const response = await axiosInstance.delete(`/transactions/${id}`);
    return response.data;
  },

  // ✅ ดาวน์โหลดรายงาน Excel พร้อม token
  exportExcel: async () => {
    const response = await axiosInstance.get("/transactions/export", {
      responseType: "blob", // สำคัญมากสำหรับการดาวน์โหลดไฟล์
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  // ✅ ดูสรุปรายรับรายจ่าย
  getSummary: async (params: {
    date?: string;
    month?: string;
    year?: string;
  }) => {
    const response = await axiosInstance.get("/transactions/summary", {
      params,
    });
    return response.data;
  },
};
