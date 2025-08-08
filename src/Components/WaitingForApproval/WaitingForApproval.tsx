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
    <div >
      <Sidebar />
      <div className="flex-1 p-6 bg-[#f9f9fb] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-xs mx-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-2 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div className="flex items-center">
            <div className="relative mx-2 cursor-pointer hover:bg-gray-100 p-2 rounded-full transition">
              <span className="material-symbols-outlined text-[24px] text-gray-700">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </div>
            <div className="relative mx-2">
              <span className="material-symbols-outlined text-gray-500">mail</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-8 h-8 ml-2 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlfGVufDB8fHx8MTc1NDA3MjY5M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Link href="/ProductsList">
            <button className={`px-4 py-2 rounded-lg font-semibold ${pathname === "/ProductsList" ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>Orders</button>
          </Link>
          <Link href="/WaitingForApproval">
            <button className={`px-4 py-2 rounded-lg font-semibold ${pathname === "/WaitingForApproval" ? "bg-black text-white" : "text-black hover:bg-gray-100"}`}>Waiting for the approve</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Sales */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Total Sales</span>
              <div className="w-6 h-6 bg-green-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold">₹ 89,000</h3>
            <span className="text-xs text-red-500 font-medium">↓ 4.3% Down from yesterday</span>
          </div>

          {/* Active Users */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Active Users</span>
              <div className="w-6 h-6 bg-purple-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold">68,192</h3>
            <span className="text-xs text-green-500 font-medium">↑ 8.5% Up from yesterday</span>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Total Orders</span>
              <div className="w-6 h-6 bg-yellow-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold">10293</h3>
            <span className="text-xs text-green-500 font-medium">↑ 1.7% Up from past week</span>
          </div>

          {/* Total Pending */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Total Pending</span>
              <div className="w-6 h-6 bg-red-50 rounded-md flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold">2040</h3>
            <span className="text-xs text-green-500 font-medium">↑ 2.6% Up from yesterday</span>
          </div>
        </div>

        {/* Product List Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Product List</h2>
            <button className="text-sm text-gray-500 hover:text-black">More →</button>
          </div>

          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left">
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
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-gray-500 text-sm">{product.category}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium">
                        ID {product.sellerId}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-indigo-600">
                      ₹ {product.price.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                        {product.payment}
                      </span>
                    </td>
                    <td className="p-4 flex items-center gap-4">
                      <button className="text-red-500 font-semibold hover:underline">Reject</button>
                      <button className="text-green-600 font-semibold hover:underline">Approve</button>
                      <button className="text-gray-600 font-semibold hover:underline">Put it on hold</button>
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
