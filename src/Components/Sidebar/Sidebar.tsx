"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Home, ShoppingBag, Users, CreditCard, Settings, HelpCircle } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/AdminDashBoard" },
    { label: "Orders", icon: <ShoppingBag className="w-5 h-5" />, path: "/ProductsList" },
    { label: "User Management", icon: <Users className="w-5 h-5" />, path: "/ViewUsers" },
    { label: "Transaction & Payment", icon: <CreditCard className="w-5 h-5" />, path: "/Transaction" },
    { label: "Account Settings", icon: <Settings className="w-5 h-5" />, path: "/Settings" },
  ];

  return (
    <div className="w-[250px] h-screen bg-white shadow-sm flex flex-col justify-between p-5 border-r border-gray-200">
      {/* Logo */}
      <div className="text-center mb-6">
        <img src="/logo.png" alt="Logo" className="mx-auto h-10 object-contain" />
      </div>

      {/* Menu */}
      <div className="space-y-6">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 text-gray-700 font-medium cursor-pointer hover:text-black hover:font-semibold transition`}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-600 cursor-pointer">
          <HelpCircle className="w-4 h-4" />
          <span>Help & getting started</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs border border-gray-300 px-3 py-1 rounded-full">Light</button>
          <button className="text-xs border border-gray-300 px-3 py-1 rounded-full text-gray-400">Dark</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
