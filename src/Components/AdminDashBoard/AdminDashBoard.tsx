import React from "react";
import Sidebar from "../Sidebar/Sidebar";

export const AdminDashBoard = () => {
    return (

        
        <div >
            <Sidebar/>
            
            <div className="bg-white min-h screen p-6">
                
                {/* Header */}
               


            <div className="bg-white p-4 w-full">
                {/* Sales Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6 w-full overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Sales Details</h2>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">May</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="h-48 w-full">
                        <div className="h-full w-full bg-gradient-to-b from-yellow-100 to-white relative">
                            <svg viewBox="0 0 800 200" className="w-full h-full">
                                <path
                                    d="M0,150 C50,120 100,170 150,100 C200,30 250,110 300,80 C350,50 400,190 450,130 C500,70 550,90 600,110 C650,130 700,100 750,120 L800,150 L800,200 L0,200 Z"
                                    fill="none"
                                    stroke="#FFEB3B"
                                    strokeWidth="3"
                                />
                                {[150, 300, 450, 600, 750].map((cx, idx) => (
                                    <circle key={idx} cx={cx} cy={[100, 80, 130, 110, 120][idx]} r="4" fill="#FFEB3B" />
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Revenue and Customers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Revenue */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Revenue</h2>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-6">$112,340</h3>
                            <div className="h-36 flex items-end space-x-2">
                                {[
                                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                ].map((month, i) => (
                                    <div key={i} className="flex flex-col items-center flex-1 relative">
                                        <div
                                            className={`w-full ${[20, 40, 70, 30, 55, 80, 65, 40, 30, 50, 35, 45][i]}% h-full rounded-t-md ${["bg-gray-200", "bg-yellow-400", "bg-gray-200", "bg-gray-200", "bg-green-400", "bg-gray-200", "bg-gray-200", "bg-cyan-400", "bg-gray-200", "bg-gray-200", "bg-blue-400", "bg-gray-200"][i]}`}
                                        >
                                            {
                                                ["", "11%", "", "", "24%", "", "", "17%", "", "", "", ""][i] && (
                                                    <div className="bg-gray-800 text-white text-xs px-1 py-0.5 rounded absolute -mt-6 ml-1">
                                                        {["", "11%", "", "", "24%", "", "", "17%", "", "", "", ""][i]}
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1">{month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            {[
                                { color: "bg-yellow-400", label: "Performance" },
                                { color: "bg-green-400", label: "Goal" },
                                { color: "bg-cyan-400", label: "Earnings" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full ${item.color} mr-1`}></div>
                                    <span className="text-xs text-gray-600">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customers */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Customers</h2>
                        </div>
                        <div className="text-xs text-gray-500 mb-4">Customer retention and acquisition statistics</div>
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative w-40 h-40">
                                <div className="w-full h-full rounded-full border-8 border-purple-200"></div>
                                <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-transparent border-t-green-400 border-r-green-400 border-b-green-400 transform -rotate-45"></div>
                                <div className="absolute inset-0 flex items-center justify-center flex-col">
                                    <span className="text-xl font-bold">82.3%</span>
                                </div>
                            </div>
                            <div className="ml-8 space-y-4">
                                {[
                                    { color: "bg-purple-100", icon: "↑", text: "+ 18%", label: "Daily customers" },
                                    { color: "bg-green-100", icon: "↑", text: "+ 14%", label: "Weekly customers" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center">
                                        <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center mr-2`}>
                                            <span className="text-green-500 text-sm">{item.icon}</span>
                                        </div>
                                        <div>
                                            <div className="text-green-500 text-sm font-medium">{item.text}</div>
                                            <div className="text-xs text-gray-500">{item.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center space-x-6 mt-2">
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-purple-400 mr-1"></span>
                                <span className="text-xs text-gray-600">Current customers</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
                                <span className="text-xs text-gray-600">New customers</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Commission and Top Sellers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Commission</h2>
                        </div>
                        <div className="h-48 flex items-end space-x-12 mt-4 mb-2">
                            {[
                                { label: "0-30 days", height: "80%" },
                                { label: "31-60 days", height: "95%" },
                                { label: "61-90 days", height: "60%" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center flex-1">
                                    <div className={`w-full h-[${item.height}] bg-gray-900 rounded-t-md`}></div>
                                    <span className="text-xs text-gray-500 mt-2">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 overflow-x-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Top Sellers</h2>
                        </div>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                                            alt="Seller"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Annette Black</div>
                                        <div className="text-xs text-gray-500">Paris</div>
                                    </div>
                                </div>
                                <div className="text-sm">$84</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total Sellers */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6 overflow-x-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Total Seller's</h2>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-md">All Time</span>
                        </div>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-2xl font-bold">68,192 Seller's</h3>
                        <span className="text-xs text-green-500">+1.04% (96 today)</span>
                    </div>
                    {/* SVG Chart */}
                    <div className="h-48 w-full relative mb-8">
                        <svg viewBox="0 0 800 200" className="w-full h-full">
                            <path
                                d="M0,150 C100,130 200,160 300,130 C400,100 500,120 600,90 C700,60 750,90 800,80"
                                fill="none"
                                stroke="#4F46E5"
                                strokeWidth="2"
                            />
                            <path
                                d="M0,180 C100,160 200,190 300,160 C400,130 500,150 600,120 C700,90 750,120 800,110"
                                fill="none"
                                stroke="#A7C7E7"
                                strokeWidth="2"
                            />
                        </svg>
                        <div className="absolute top-1/3 right-1/3 bg-white border border-gray-200 rounded-md px-4 py-2 shadow-md">
                            <div className="text-sm text-gray-500">May</div>
                            <div className="flex space-x-4 mb-1">
                                <div className="font-medium text-sm">2023</div>
                                <div className="text-sm text-gray-500">2022</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <div className="flex flex-wrap items-center text-sm gap-1">
                            <span>Welcome</span>
                            <span className="font-medium">291 Seller's</span>
                            <span>with a personal message 👋</span>
                        </div>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">Send message</button>
                    </div>
                    <div className="flex flex-wrap space-x-4">
                        {[
                            { name: "Courtney Henry", img: "https://randomuser.me/api/portraits/women/2.jpg" },
                            { name: "Jenny Wilson", img: "https://randomuser.me/api/portraits/women/3.jpg" },
                            { name: "Cameron Williamson", img: "https://randomuser.me/api/portraits/men/4.jpg" }
                        ].map((person, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden mb-2">
                                    <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="text-xs text-center">{person.name}</div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
                            </div>
                            <div className="text-xs">View all</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
