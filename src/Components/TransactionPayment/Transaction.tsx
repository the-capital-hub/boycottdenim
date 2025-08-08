"use client";

import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { CreditCard, Receipt, Wallet } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col lg:flex-row font-['Open Sans'] text-[#3e3e3e]">
      {/* Sidebar */}
      <div className="w-full lg:w-64 border-r">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-10 py-6 space-y-10">
        {/* Top Cards Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Total Balance */}
          <div className="flex-1 rounded-xl shadow bg-white p-5">
            <div className="text-sm text-[#999] mb-1">Total Balance</div>
            <div className="text-[22px] font-semibold mb-4">₹240,399</div>

            <div className="bg-black text-white rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-sm">Account Type</div>
                <div className="text-md font-semibold">Debit Card</div>
                <div className="text-xs">**** **** **** 2598</div>
              </div>
              <div className="text-lg font-semibold">₹2,50,000</div>
            </div>
          </div>

          {/* Goals */}
          <div className="flex-1 rounded-xl shadow bg-white p-5 border-2 border-dashed border-[#2f80ed]">
            <div className="flex justify-between">
              <div className="text-[18px] font-semibold">₹20,0000 ✏️</div>
              <div className="text-sm text-[#999]">May, 2023</div>
            </div>
            <div className="mt-4 text-sm">
              <div className="text-[#999]">Target Achieved</div>
              <div className="font-semibold">₹1,25000</div>
              <div className="mt-2 text-[#999]">This month Target</div>
              <div className="font-semibold">₹2,00,000</div>
            </div>

            <div className="mt-4">
              <div className="text-center text-sm font-semibold mb-1">12K</div>
              <div className="h-2 w-full bg-[#f1f1f1] rounded-full">
                <div className="h-full w-[60%] bg-yellow-400 rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs text-[#999] mt-1">
                <span>0</span>
                <span>₹200K</span>
              </div>
              <div className="text-center text-xs text-[#999] mt-1">Target vs Achievement</div>
            </div>
          </div>

          {/* Upcoming Bill */}
          <div className="flex-1 rounded-xl shadow bg-white p-5">
            <div className="flex justify-between mb-4">
              <div className="text-sm text-[#999]">Upcoming Bill</div>
              <div className="text-sm font-medium text-[#2f80ed] cursor-pointer">View All</div>
            </div>

            <div className="space-y-4">
              <div className="border border-[#e5e5e5] rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Odoo - Monthly</div>
                    <div className="text-xs text-[#999]">Last Charge - 14 May, 2022</div>
                  </div>
                  <div className="text-sm font-semibold">₹150</div>
                </div>
              </div>
              <div className="border border-[#e5e5e5] rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">M365 - Yearly</div>
                    <div className="text-xs text-[#999]">Last Charge - 17 Jun, 2023</div>
                  </div>
                  <div className="text-sm font-semibold">₹559</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-4">
          <div className="text-xl font-semibold">Recent Transaction</div>

          <div className="flex flex-wrap gap-6 text-sm font-medium text-[#999] border-b border-[#ccc] pb-2">
            <span className="text-black border-b-2 border-black">All</span>
            <span>Revenue</span>
            <span>Expenses</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-[#f5f5f5] text-left">
                <tr>
                  <th className="px-4 py-3">Items</th>
                  <th className="px-4 py-3">Shop Name</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Payment Method</th>
                  <th className="px-4 py-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[160, 20, 12, 15, 10, 20, 30].map((amount, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">Ankle Fit</td>
                    <td className="px-4 py-3">BOY COTT</td>
                    <td className="px-4 py-3">17 May, 2023</td>
                    <td className="px-4 py-3">
                      {index === 1 ? "Invoice" : index === 4 ? "Cash" : "Credit Card"}
                    </td>
                    <td className="px-4 py-3">₹{amount}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-black text-white px-6 py-2 rounded-md">Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
