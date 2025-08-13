"use client";
import React, { useState } from "react";
import { Check, Send, Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Qr from "../../../public/Qr-code.jpg";
import google from "../../../public/playstore.png";
import apple from "../../../public/appstore.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setEmail("");
      }, 2000);
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const linkHoverVariants = {
    hover: {
      x: 5,
      color: "#ffffff",
      transition: { duration: 0.2 },
    },
  };

  const iconHoverVariants = {
    hover: {
      scale: 1.2,
      color: "#ffffff",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="bg-black text-white">
      <motion.div
        className="container mx-auto px-4 md:px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Exclusive */}
          <motion.div variants={itemVariants}>
            <motion.h3 className="text-lg font-semibold mb-4">Exclusive</motion.h3>
            <motion.p className="text-sm mb-4 text-gray-300">Subscribe</motion.p>
            <motion.p className="text-xs text-gray-400 mb-4">
              Get 10% off your first order
            </motion.p>

            <div className="relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ width: "40px", opacity: 0 }}
                    animate={{ width: "40px", opacity: 1 }}
                    exit={{ width: "100%", opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center h-10 rounded-full border mx-auto"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                ) : isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ width: "100%" }}
                    animate={{ width: "40px" }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-center h-10 w-10 rounded-full border mx-auto"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="input"
                    initial={{ width: "96px", opacity: 0 }}
                    animate={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 pr-10 bg-transparent border border-gray-600 rounded text-sm placeholder-gray-400 focus:outline-none focus:border-white"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") handleSubmit(e);
                      }}
                    />
                    <motion.button
                      onClick={handleSubmit}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                      whileHover={{ color: "#ffffff", scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <motion.h3 className="text-lg font-semibold mb-4">Support</motion.h3>
            <div className="space-y-2 text-sm text-gray-400">
              <motion.p variants={linkHoverVariants} whileHover="hover" className="cursor-pointer">
                help@divinestyleonline.in
              </motion.p>
              <motion.p variants={linkHoverVariants} whileHover="hover" className="cursor-pointer">
                +91-9945234161
              </motion.p>
            </div>
          </motion.div>

          {/* Account */}
          <motion.div variants={itemVariants}>
  <motion.h3 className="text-lg font-semibold mb-4">Account</motion.h3>
  <ul className="space-y-2 text-sm text-gray-400">
    {[
      { label: "My Account", href: "/account" },
      { label: "Login / Register", href: "/Register" },
      { label: "Cart", href: "/Cart" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Shop", href: "/Shop" }
    ].map((item, index) => (
      <motion.li key={item.label}>
        <Link href={item.href} passHref>
          <motion.span
            variants={linkHoverVariants}
            whileHover="hover"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="block cursor-pointer"
          >
            {item.label}
          </motion.span>
        </Link>
      </motion.li>
    ))}
  </ul>
</motion.div>


          {/* Quick Link */}
          <motion.div variants={itemVariants}>
  <motion.h3 className="text-lg font-semibold mb-4">Quick Link</motion.h3>
  <ul className="space-y-2 text-sm text-gray-400">
    {[
      { label: "Privacy Policy", href: "/PrivacyPolicy" },
      { label: "Terms Of Use", href: "/TermsofUse" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" }
    ].map((item, index) => (
      <motion.li key={item.label}>
        <motion.a
          href={item.href}
          variants={linkHoverVariants}
          whileHover="hover"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="block"
        >
          {item.label}
        </motion.a>
      </motion.li>
    ))}
  </ul>
</motion.div>


          {/* Download App */}
          <motion.div variants={itemVariants}>
            <motion.h3 className="text-lg font-semibold md:mb-4 ">Download App</motion.h3>
            <motion.p className="text-xs text-gray-400 md:mb-4 ">
              Save 10% with App New User Only
            </motion.p>

            <div className="flex lg:gap-4 mb-4 ">
              <div className="w-16 h-16 md:block hidden bg-white p-2 rounded">
                <Image src={Qr} alt="QR Code" />
              </div>
              <div className="flex justify-center items-center">
                <div className="cursor-pointer">
                  <Image src={google} alt="Google Play " width={110} />
                </div>
                <div className="cursor-pointer">
                  <Image src={apple} alt="Apple Store"  width={100}  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={iconHoverVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.3 }}
                  className="cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-800 mt-8 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <p className="text-center text-sm text-gray-400">
            © Copyright Divine 2024. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
