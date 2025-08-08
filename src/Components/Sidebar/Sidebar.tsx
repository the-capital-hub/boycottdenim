"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import Boy from "../../../public/boycott-logo.png";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile state and auto-close sidebar when resizing
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const menuItems = [
    { label: "Home", icon: <Home className="w-5 h-5" />, path: "/" },
    { label: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/AdminDashBoard" },
    { label: "Orders", icon: <ShoppingBag className="w-5 h-5" />, path: "/ProductsList" },
    { label: "User Management", icon: <Users className="w-5 h-5" />, path: "/ViewUsers" },
    { label: "Transaction & Payment", icon: <CreditCard className="w-5 h-5" />, path: "/Transaction" },
    { label: "Account Settings", icon: <Settings className="w-5 h-5" />, path: "/Settings" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false); // Close sidebar after navigation
  };

  return (
    <>
      {/* Mobile Header - Always visible on mobile */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b sticky top-0 z-50">
        <Image 
          src={Boy} 
          alt="BoyCott Denim" 
          className="h-8 w-auto" 
          priority
        />
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Desktop Sidebar - Only visible on desktop */}
      <div className="hidden md:block w-[250px] min-h-screen sticky top-0">
        <div className="h-full p-5 border-r shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-center mb-6">
              <Image 
                src={Boy} 
                alt="BoyCott Denim" 
                className="mx-auto h-10 object-contain" 
                priority
              />
            </div>
            <nav className="space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg text-gray-700 font-medium cursor-pointer transition-all ${pathname === item.path ? 'bg-gray-100 text-black font-semibold' : 'hover:bg-gray-50 hover:text-black'}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
          <div className="space-y-3 text-sm mt-6">
            <button className="w-full flex items-center gap-2 text-gray-600 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
              <HelpCircle className="w-4 h-4" />
              <span>Help & getting started</span>
            </button>
            <div className="flex items-center gap-2 p-2">
              <button className="text-xs border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50">
                Light
              </button>
              <button className="text-xs border border-gray-300 px-3 py-1 rounded-full text-gray-400 hover:bg-gray-50">
                Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div className={`absolute left-0 top-0 w-[250px] h-full bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <Image 
                  src={Boy} 
                  alt="BoyCott Denim" 
                  className="h-10 object-contain" 
                  priority
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg text-gray-700 font-medium cursor-pointer transition-all ${pathname === item.path ? 'bg-gray-100 text-black font-semibold' : 'hover:bg-gray-50 hover:text-black'}`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="space-y-3 text-sm">
              <button className="w-full flex items-center gap-2 text-gray-600 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                <HelpCircle className="w-4 h-4" />
                <span>Help & getting started</span>
              </button>
              <div className="flex items-center gap-2 p-2">
                <button className="text-xs border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50">
                  Light
                </button>
                <button className="text-xs border border-gray-300 px-3 py-1 rounded-full text-gray-400 hover:bg-gray-50">
                  Dark
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;