"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12 sm:px-6 lg:px-44 lg:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Our experts will be happy to assist you with your queries
          </p>
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg border border-black overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Panel */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-black text-white p-6 sm:p-8 m-3 rounded-lg lg:w-2/5"
            >
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="text-xl sm:text-2xl font-medium mb-2"
                >
                  Contact Information
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="text-gray-300 mb-10"
                >
                  Say something to start a live chat!
                </motion.p>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-4"
                  >
                    <Phone className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm sm:text-base">
                      +919900330411
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-4"
                  >
                    <Mail className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm sm:text-base">
                      support@boycottdenim.com
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start space-x-4"
                  >
                    <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                    <div className="text-sm sm:text-base">
                      <div>SUDABI BRANDS PRIVATE LIMITED.
                          No 3B/415/19A, II Stage 4th Phase Peenya Industrial Area,
                          100 ft Road, Near TVS Cross,
                          </div>
                      <div>Peenya, Bengaluru, Karnataka, India - 560058.</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="p-6 sm:p-8 lg:w-3/5"
            >
              <form
                onSubmit={handleSubmit}
                className="h-full flex flex-col"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border-b text-black border-gray-300 pb-2 focus:border-gray-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border-b text-black border-gray-300 pb-2 focus:border-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b text-black border-gray-300 pb-2 focus:border-gray-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-b text-black border-gray-300 pb-2 focus:border-gray-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1 mb-6">
                  <label className="block text-sm text-gray-600 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleTextAreaChange}
                    placeholder="Write your message.."
                    rows={6}
                    className="w-full border-b text-black border-gray-300 pb-2 focus:border-gray-900 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-[#ffe800] hover:bg-yellow-300 text-black font-medium px-6 py-3 rounded-full transition-colors"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
