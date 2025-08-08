"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  sellerId: string;
  price: number;
  payment: "Success" | "Failed";
}

const products: Product[] = [
  {
    id: 1,
    name: "Ankle Fit",
    category: "Pants",
    image: "/products/ankle.jpg",
    sellerId: "098980",
    price: 5000,
    payment: "Success",
  },
  {
    id: 2,
    name: "Slim Fit",
    category: "Jeans",
    image: "/products/slim.jpg",
    sellerId: "098981",
    price: 3500,
    payment: "Success",
  },
  {
    id: 3,
    name: "Regular Fit",
    category: "Shorts",
    image: "/products/regular.jpg",
    sellerId: "098982",
    price: 2200,
    payment: "Success",
  },
  {
    id: 4,
    name: "Bootcut Fit",
    category: "Trousers",
    image: "/products/bootcut.jpg",
    sellerId: "098983",
    price: 4000,
    payment: "Success",
  },
  {
    id: 5,
    name: "Baggy Fit",
    category: "Cargo Pants",
    image: "/products/baggy.jpg",
    sellerId: "098984",
    price: 3000,
    payment: "Success",
  },
  {
    id: 6,
    name: "Wide Leg",
    category: "Palazzo Pants",
    image: "/products/wide.jpg",
    sellerId: "098985",
    price: 4500,
    payment: "Success",
  },
  {
    id: 7,
    name: "Tapered Fit",
    category: "Chinos",
    image: "/products/tapered.jpg",
    sellerId: "098986",
    price: 3800,
    payment: "Success",
  },
];

export default function OrderList() {
  const pathname = usePathname();
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 px-4 sm:px-6 py-6 bg-[#f9f9fb] overflow-y-auto">
        {/* Topbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-2 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
              <span className="material-symbols-outlined text-[24px] text-gray-700">
                notifications
              </span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
            </div>
            <div className="relative p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
              <span className="material-symbols-outlined text-gray-500">mail</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
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

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1 */}
          <Card title="Total Sales" value="₹ 89,000" change="↓ 4.3% Down from yesterday" color="green" />
          {/* Card 2 */}
          <Card title="Active Users" value="68,192" change="↑ 8.5% Up from yesterday" color="purple" />
          {/* Card 3 */}
          <Card title="Total Orders" value="10,293" change="↑ 1.7% Up from past week" color="yellow" />
          {/* Card 4 */}
          <Card title="Total Pending" value="2,040" change="↑ 2.6% Up from yesterday" color="red" />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Product List</h2>
            <button className="text-sm text-gray-500 hover:text-black">More →</button>
          </div>

          <table className="min-w-[600px] w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 font-medium">
              <tr>
                <th className="p-4"></th>
                <th className="p-4">Product</th>
                <th className="p-4">Seller ID</th>
                <th className="p-4">Price</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selected.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="p-4 flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-12 h-16 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-gray-500 text-sm">{product.category}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">ID {product.sellerId}</span>
                  </td>
                  <td className="p-4 font-semibold text-indigo-600">₹ {product.price.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">{product.payment}</span>
                  </td>
                  <td className="p-4 flex flex-wrap gap-2">
                    <button className="text-red-500 font-semibold hover:underline">Reject</button>
                    <button className="text-green-600 font-semibold hover:underline">Approve</button>
                    <button className="text-gray-600 font-semibold hover:underline">Put on hold</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


function Card({
  title,
  value,
  change,
  color,
}: {
  title: string;
  value: string;
  change: string;
  color: "green" | "purple" | "yellow" | "red";
}) {
  const bgColors = {
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
    yellow: "bg-yellow-50 text-yellow-500",
    red: "bg-red-50 text-red-500",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${bgColors[color]}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" />
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold">{value}</h3>
      <span className="text-xs text-gray-500 font-medium">{change}</span>
    </div>
  );
}