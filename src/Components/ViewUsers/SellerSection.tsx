"use client";
import React, { useState } from "react";
import SellerCard from "./SellerCard";

const dummySellers = new Array(8).fill({
  name: "Cameron Williamson",
  id: "098983",
  avatar: "https://randomuser.me/api/portraits/men/75.jpg",
});

export default function SellerSection() {
  const [search, setSearch] = useState("");

  const presentSellers = dummySellers.slice(0, 3);
  const requestSellers = dummySellers;

  return (
    <div className="space-y-10 p-6 max-w-7xl mx-auto">
      {/* Present Sellers Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Present Seller's</h2>
          <input
            type="text"
            placeholder="Search Seller or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-md text-sm w-72 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {presentSellers.map((s, i) => (
            <SellerCard key={i} {...s} />
          ))}
        </div>
      </div>

      {/* Request Sellers Section */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Request Seller's</h2>
          <input
            type="text"
            placeholder="Search Seller or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-md text-sm w-72 focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {requestSellers.map((s, i) => (
            <SellerCard key={i} {...s} showApprove />
          ))}
        </div>
      </div>
    </div>
  );
}
