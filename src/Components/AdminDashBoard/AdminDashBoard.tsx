import React from "react";
import Sidebar from "../Sidebar/Sidebar";

export const AdminDashBoard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 bg-white p-6 overflow-x-hidden">
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
                                ].map((month, i) => {
                                    const heights = [20, 40, 70, 30, 55, 80, 65, 40, 30, 50, 35, 45];
                                    const colors = [
                                        "bg-gray-200", "bg-yellow-400", "bg-gray-200", "bg-gray-200",
                                        "bg-green-400", "bg-gray-200", "bg-gray-200", "bg-cyan-400",
                                        "bg-gray-200", "bg-gray-200", "bg-blue-400", "bg-gray-200"
                                    ];
                                    const labels = ["", "11%", "", "", "24%", "", "", "17%", "", "", "", ""];
                                    return (
                                        <div key={i} className="flex flex-col items-center flex-1 relative">
                                            <div
                                                className={`w-full rounded-t-md ${colors[i]}`}
                                                style={{ height: `${heights[i]}%` }}
                                            ></div>
                                            {labels[i] && (
                                                <div className="bg-gray-800 text-white text-xs px-1 py-0.5 rounded absolute -mt-6 ml-1">
                                                    {labels[i]}
                                                </div>
                                            )}
                                            <span className="text-xs text-gray-500 mt-1">{month}</span>
                                        </div>
                                    );
                                })}
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
                    {/* ... Rest of your code stays the same ... */}
                </div>
            </div>
        </div>
    );
};
