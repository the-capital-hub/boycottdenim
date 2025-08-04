"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar"; // Adjust path if needed

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
];

export default function ProductList() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-[#f9f9fb]">
        {/* Entire bordered card */}
        <div className="border rounded-xl bg-white shadow-md p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Product List</h1>
            <button className="text-sm text-gray-500 hover:text-black">More →</button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search product"
            className="w-72 border rounded-lg px-4 py-2 text-sm"
          />

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border">
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
                        className="w-12 h-16 rounded-lg object-cover border"
                      />
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-gray-500">{product.category}</div>
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
                    <td className="p-4 space-x-2">
                      <button className="text-red-500 hover:underline">Reject</button>
                      <button className="text-green-600 hover:underline">Approve</button>
                      <button className="text-gray-600 hover:underline">Put it on hold</button>
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
