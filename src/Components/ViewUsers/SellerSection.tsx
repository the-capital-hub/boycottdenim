"use client";
import React, { useState } from "react";
import SellerCard from "./SellerCard";
import Sidebar from "../Sidebar/Sidebar";

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

    <div className="flex min-h-screen flex-col md:flex-row">

     
        <Sidebar />
      

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-10 bg-[#f9f9fb]">
        {/* Present Sellers Section */}
        <section className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Present Seller's</h2>
            <input
              type="text"
              placeholder="Search Seller or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-md text-sm w-full sm:w-72 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentSellers.map((s, i) => (
              <SellerCard key={i} {...s} />
            ))}
          </div>
        </section>

        {/* Request Sellers Section */}
        <section className="border border-gray-200 rounded-xl p-4 sm:p-6 bg-white shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Request Seller's</h2>
            <input
              type="text"
              placeholder="Search Seller or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-md text-sm w-full sm:w-72 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requestSellers.map((s, i) => (
              <SellerCard key={i} {...s} showApprove />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
