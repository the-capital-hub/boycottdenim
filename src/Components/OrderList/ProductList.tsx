"use client";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Order Types
type OrderStatus = "Completed" | "In Progress" | "Pending";

interface Order {
  id: string;
  product: string;
  category: string;
  qty: number;
  date: string;
  revenue: number;
  profit: number;
  status: OrderStatus;
}

const orders: Order[] = [
  {
    id: "#5302002",
    product: "Ankle Fit",
    category: "Pants",
    qty: 2,
    date: "June 2, 2025",
    revenue: 253.82,
    profit: 60.76,
    status: "Completed",
  },
  {
    id: "#5302003",
    product: "Slim Fit",
    category: "Shirt",
    qty: 1,
    date: "June 15, 2025",
    revenue: 45.5,
    profit: 45.5,
    status: "In Progress",
  },
  {
    id: "#5302004",
    product: "Regular Fit",
    category: "Shorts",
    qty: 3,
    date: "June 20, 2025",
    revenue: 96.0,
    profit: 32.0,
    status: "Pending",
  },
];

const statusColors: Record<OrderStatus, string> = {
  Completed: "text-green-600",
  "In Progress": "text-orange-500",
  Pending: "text-red-500",
};

export default function OrderList() {
  const pathname = usePathname();

  return (

    <div >


      <Sidebar />
      <div className="flex-1 bg-[#f9f9fb] px-4 sm:px-6 py-6">
        {/* Topbar */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-2 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full">
              <span className="material-symbols-outlined text-[24px] text-gray-700">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined text-gray-500">mail</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>

            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlfGVufDB8fHx8MTc1NDA3MjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/ProductsList">
            <button className={`px-4 py-2 rounded-lg font-semibold ${pathname === "/ProductsList" ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>
              Orders
            </button>
          </Link>
          <Link href="/WaitingForApproval">
            <button className={`px-4 py-2 rounded-lg font-semibold ${pathname === "/WaitingForApproval" ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>
              Waiting for the approve
            </button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Sales", value: "₹ 89,000", trend: "↓ 4.3%", color: "green", bg: "green-50", trendColor: "text-red-500" },
            { label: "Active Users", value: "68,192", trend: "↑ 8.5%", color: "purple", bg: "purple-50", trendColor: "text-green-500" },
            { label: "Total Orders", value: "10293", trend: "↑ 1.7%", color: "yellow", bg: "yellow-50", trendColor: "text-green-500" },
            { label: "Total Pending", value: "2040", trend: "↑ 2.6%", color: "red", bg: "red-50", trendColor: "text-green-500" },
          ].map((card, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">{card.label}</span>
                <div className={`w-6 h-6 bg-${card.bg} rounded-md flex items-center justify-center`}>
                  <div className={`h-4 w-4 text-${card.color}-500`}>
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold">{card.value}</h3>
              <span className={`text-xs font-medium ${card.trendColor}`}>{card.trend} from yesterday</span>
            </div>
          ))}
        </div>

        {/* Order Table */}
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 space-y-4">
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">Orders</h1>
            <button className="text-sm text-gray-500 hover:text-black">More →</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Products</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Revenue</th>
                  <th className="p-4">Net Profit</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4 text-indigo-600 font-medium">{order.id}</td>
                    <td className="p-4">
                      <div className="font-semibold">{order.product}</div>
                      <div className="text-xs text-gray-500">{order.category}</div>
                    </td>
                    <td className="p-4">{order.qty}</td>
                    <td className="p-4">{order.date}</td>
                    <td className="p-4">${order.revenue.toFixed(2)}</td>
                    <td className="p-4">${order.profit.toFixed(2)}</td>
                    <td className={`p-4 font-medium ${statusColors[order.status]}`}>{order.status}</td>
                    <td className="p-4 space-x-3">
                      <button className="text-indigo-500 hover:underline">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="text-red-500 hover:underline">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                      <button className="text-gray-500 hover:underline">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
