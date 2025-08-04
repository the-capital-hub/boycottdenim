import React from "react"
import Sidebar from "../Sidebar/Sidebar"

export const AdminDashBoard = () => {
    return (
        
        <div className="flex min-h screen">
            <Sidebar/>
            
            <div className="bg-white min-h screen p-6">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <span className="text-sm font-medium">Search</span>
                    </div>
                    <div className="flex items-center">
                        <div className="relative mx-2">
                            <span className="material-symbols-outlined text-gray-500">search</span>
                        </div>
                        <div className="relative mx-2">
                            <span className="material-symbols-outlined text-gray-500">notifications</span>
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
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

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold">₹ 89,000</h3>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-red-500 font-medium">↓ 4.3% Down from yesterday</span>
                        </div>
                    </div>

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
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold">68,192</h3>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-green-500 font-medium">↑ 8.5% Up from yesterday</span>
                        </div>
                    </div>

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
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold">10293</h3>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-green-500 font-medium">↑ 1.7% Up from past week</span>
                        </div>
                    </div>

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
                        <div className="mb-2">
                            <h3 className="text-2xl font-bold">2040</h3>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-green-500 font-medium">↑ 2.6% Up from yesterday</span>
                        </div>
                    </div>
                </div>

                {/* Sales Details */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
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
                                <circle cx="150" cy="100" r="4" fill="#FFEB3B" />
                                <circle cx="300" cy="80" r="4" fill="#FFEB3B" />
                                <circle cx="450" cy="130" r="4" fill="#FFEB3B" />
                                <circle cx="600" cy="110" r="4" fill="#FFEB3B" />
                                <circle cx="750" cy="120" r="4" fill="#FFEB3B" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Revenue and Customers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Revenue</h2>
                            <div className="flex space-x-1">
                                <span className="material-symbols-outlined text-gray-400 text-lg">more_horiz</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-6">$112,340</h3>
                            <div className="h-36 flex items-end space-x-2">
                                {[
                                    "Jan",
                                    "Feb",
                                    "Mar",
                                    "Apr",
                                    "May",
                                    "Jun",
                                    "Jul",
                                    "Aug",
                                    "Sep",
                                    "Oct",
                                    "Nov",
                                    "Dec"
                                ].map((month, i) => (
                                    <div key={i} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-full ${[20, 40, 70, 30, 55, 80, 65, 40, 30, 50, 35, 45][i % 12]}% h-full rounded-t-md ${["bg-gray-200", "bg-yellow-400", "bg-gray-200", "bg-gray-200", "bg-green-400", "bg-gray-200", "bg-gray-200", "bg-cyan-400", "bg-gray-200", "bg-gray-200", "bg-blue-400", "bg-gray-200"][i % 12]}`}
                                        >
                                            {[
                                                null,
                                                "11%",
                                                null,
                                                null,
                                                "24%",
                                                null,
                                                null,
                                                "17%",
                                                null,
                                                null,
                                                null,
                                                null
                                            ][i % 12] && (
                                                <div className="bg-gray-800 text-white text-xs px-1 py-0.5 rounded absolute -mt-6 ml-1">
                                                    {
                                                        [
                                                            null,
                                                            "11%",
                                                            null,
                                                            null,
                                                            "24%",
                                                            null,
                                                            null,
                                                            "17%",
                                                            null,
                                                            null,
                                                            null,
                                                            null
                                                        ][i % 12]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1">{month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            {[
                                {color: "bg-yellow-400", label: "Performance"},
                                {color: "bg-green-400", label: "Goal"},
                                {color: "bg-cyan-400", label: "Earnings"}
                            ].map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full ${item.color} mr-1`}></div>
                                    <span className="text-xs text-gray-600">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Customers</h2>
                            <div className="flex space-x-1">
                                <span className="material-symbols-outlined text-gray-400 text-lg">more_horiz</span>
                            </div>
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
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                                        <span className="material-symbols-outlined text-purple-500 text-sm">
                                            arrow_upward
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-green-500 text-sm font-medium">+ 18%</div>
                                        <div className="text-xs text-gray-500">Daily customers</div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                        <span className="material-symbols-outlined text-green-500 text-sm">
                                            arrow_upward
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-green-500 text-sm font-medium">+ 14%</div>
                                        <div className="text-xs text-gray-500">Weekly customers</div>
                                    </div>
                                </div>
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
                            <div className="text-sm text-gray-500">Upcoming</div>
                            <div className="text-sm text-gray-500">Paid</div>
                        </div>
                        <div className="h-48 flex items-end space-x-12 mt-4 mb-2">
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-full h-80% bg-gray-900 rounded-t-md"></div>
                                <span className="text-xs text-gray-500 mt-2">0-30 days</span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-full h-95% bg-gray-900 rounded-t-md"></div>
                                <span className="text-xs text-gray-500 mt-2">31-60 days</span>
                            </div>
                            <div className="flex flex-col items-center flex-1">
                                <div className="w-full h-60% bg-gray-900 rounded-t-md"></div>
                                <span className="text-xs text-gray-500 mt-2">61-90 days</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">Upcoming</div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Top Sellers</h2>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Paid</span>
                                <span className="material-symbols-outlined text-gray-400">more_horiz</span>
                            </div>
                        </div>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                        <img
                                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxzZWxsZXJ8ZW58MHx8fHwxNzU0MDM0ODg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                                            alt="Seller"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium">Annette Black</div>
                                        <div className="text-xs text-gray-500">Paris</div>
                                    </div>
                                </div>
                                <div className="text-sm">Total Sales</div>
                                <div className="text-sm">$84</div>
                                <div className="text-sm">Location</div>
                                <div className="text-sm text-gray-500">US</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Total Seller's */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Total Seller's</h2>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-md">All Time</span>
                            <span className="material-symbols-outlined text-gray-400 ml-1">expand_more</span>
                        </div>
                    </div>
                    <div className="mb-2">
                        <h3 className="text-2xl font-bold">68,192 Seller's</h3>
                        <span className="text-xs text-green-500">+1.04% (96 today)</span>
                    </div>
                    <div className="h-48 w-full relative mb-8">
                        <div className="h-full w-full">
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
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                        <span>Jul</span>
                        <span>Aug</span>
                        <span>Sep</span>
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-500">
                        <span>Jan 1-Dec 31, 2023</span>
                        <span>Jan 1-Dec 31, 2022</span>
                    </div>
                </div>

                {/* Messages */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <span className="text-sm">Welcome </span>
                            <span className="font-medium text-sm ml-1">291 Seller's</span>
                            <span className="text-sm ml-1">with a personal message</span>
                            <span className="ml-1">👋</span>
                        </div>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm">Send message</button>
                    </div>
                    <div className="flex space-x-6">
                        {[
                            {name: "Courtney Henry", img: "https://randomuser.me/api/portraits/women/2.jpg"},
                            {name: "Jenny Wilson", img: "https://randomuser.me/api/portraits/women/3.jpg"},
                            {name: "Cameron Williamson", img: "https://randomuser.me/api/portraits/men/4.jpg"}
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
    )
}
