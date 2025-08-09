"use client";

import React from "react";
import Sidebar from "../Sidebar/Sidebar";

export const SettingsForm = () => {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar - hidden on small screens, visible on md+ */}

        <Sidebar />


      {/* Main content */}
      <div className="bg-white p-4 sm:p-6 w-full max-w-7xl mx-auto flex-1">
        {/* Top Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3">
            <p className="text-sm font-medium">Search</p>
          </div>
          <div className="md:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent transition-all"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
            </div>
          </div>
          <div className="md:col-span-3 flex justify-end items-center gap-4">
            <button className="relative hover:bg-gray-100 p-2 rounded-full transition-all hover:scale-105">
              <span className="material-symbols-outlined">Mail</span>
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2.5 h-2.5 ring-2 ring-white"></span>
            </button>
            <button className="relative hover:bg-gray-100 p-2 rounded-full transition-all hover:scale-105">
              <span className="material-symbols-outlined">Notifications</span>
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2.5 h-2.5 ring-2 ring-white"></span>
            </button>
            <div className="relative group">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZXxlbnwwfHx8fDE3NTM5NjgxNjh8MA&auto=format&fit=crop&w=1080&q=80"
                alt="User profile"
                className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary-300 transition-all cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Setting Details</h1>
          <p className="text-gray-500 mt-1">Update your photo and personal details here.</p>
        </div>

        {/* Main Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Left section */}
          <div className="md:col-span-8">
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-500">person</span>
                  Personal information
                </h2>
              </div>

              <div className="p-6">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-medium text-sm">Full Name</label>
                    <input type="text" placeholder="Enter first name" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm">Last Name</label>
                    <input type="text" placeholder="Enter last name" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block mb-2 font-medium text-sm">Email Address</label>
                    <input type="email" placeholder="Enter email address" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm">Username</label>
                    <input type="text" placeholder="Enter user name" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block mb-2 font-medium text-sm">Phone No</label>
                    <input type="tel" placeholder="Enter phone no" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm">City</label>
                    <input type="text" placeholder="Enter your city" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block mb-2 font-medium text-sm">Country Name</label>
                    <input type="text" placeholder="Enter country name" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-sm">Zip code</label>
                    <input type="text" placeholder="Enter zip code" className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" />
                  </div>
                </div>

                {/* Bio section */}
                <div className="mt-6">
                  <label className="block mb-2 font-medium text-sm">Bio</label>
                  <textarea className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 h-32 resize-none text-gray-500 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none" placeholder="Write a short introduction..." />
                </div>

                {/* Timezone dropdown */}
                <div className="mt-6">
                  <label className="block mb-2 font-medium text-sm">Timezone</label>
                  <select className="w-full p-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-300 focus:border-transparent outline-none">
                    <option>Pacific Standard Time</option>
                    <option>Eastern Standard Time</option>
                    <option>Central Standard Time</option>
                    <option>Mountain Standard Time</option>
                    <option>Alaska Standard Time</option>
                    <option>Hawaii-Aleutian Standard Time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="md:col-span-4">
            <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <h2 className="font-medium mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-500">photo_camera</span>
                Your Photo
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary-100 rounded-full w-10 h-10 flex items-center justify-center hover:bg-primary-200 transition-colors">
                  <span className="material-symbols-outlined text-primary-500">edit</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Edit your photo</p>
                  <p className="text-xs text-primary-500 hover:underline cursor-pointer">Update</p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center h-44 hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer">
                <span className="material-symbols-outlined mb-2 text-2xl text-gray-400">cloud_upload</span>
                <p className="text-sm text-center text-gray-500">
                  Click to upload or drag and drop
                  <br />
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-6">
              <button className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all w-1/2 font-medium text-gray-700 hover:shadow-sm">Cancel</button>
              <button className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all w-1/2 font-medium shadow-sm hover:shadow">Save</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsForm;

    )
}

