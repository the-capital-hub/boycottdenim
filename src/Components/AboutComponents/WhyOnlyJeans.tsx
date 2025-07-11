"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { PT_Mono } from "next/font/google";

const ptMono = PT_Mono({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const WhyOnlyJeans = () => {
  return (
    <div className={`bg-black text-white font-mono py-5 ${ptMono.className}`}>
      {/* Hero Section */}
      <motion.section
        className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8"
            variants={fadeInUp}
          >
            Why Only Jeans?
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl mb-8 font-light"
            variants={fadeInUp}
          >
            Because we believe in{" "}
            <span className="font-bold">
              doing one thing better than anyone else.
            </span>
          </motion.p>

          <motion.div
            className="space-y-2 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto"
            variants={staggerContainer}
          >
            <motion.p variants={slideInLeft}>
              Jeans are timeless. They&apos;re tough. They evolve with you. From
              vintage raw edge to clean modern cuts,
            </motion.p>
            <motion.p variants={slideInRight}>
              denim never dies — and neither do the stories woven into every
              thread.
            </motion.p>
            <motion.p variants={slideInLeft}>
              We didn&apos;t want to be another generic fashion brand.
            </motion.p>
            <motion.p variants={slideInRight}>
              So we said no to the clutter, and yes to the core.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Boy Cott Mindset Section */}
      <motion.section
        className="flex flex-col justify-center items-center mt-8 px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12"
            variants={fadeInUp}
          >
            The Boy Cott Mindset
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl lg:text-3xl mb-8 font-light"
            variants={fadeInUp}
          >
            This brand isn’t for everyone.
          </motion.p>

          <motion.div
            className="space-y-2 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto mb-12"
            variants={staggerContainer}
          >
            <motion.p variants={slideInLeft}>
              We&apos;re here to start a denim culture where fit meets fire.
            </motion.p>
            <motion.p variants={slideInRight}>
              Where your jeans become your second skin.
            </motion.p>
            <motion.p variants={slideInLeft}>
              Where your identity lives in every crease and fold.
            </motion.p>
            <motion.p variants={slideInRight}>
              Where being real matters more than looking perfect. Where denim
              doesn’t follow the rules—it creates them.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="flex flex-col justify-center h-[50vh] relative top-5 items-center px-4 py-4 sm:px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h3
            className="text-3xl text-black sm:text-4xl lg:text-5xl font-bold mb-8 tracking-wide"
            variants={fadeInUp}
          >
            Join the Boy Cott. Wear the difference.
          </motion.h3>

          <motion.p
            className="text-2xl sm:text-3xl text-black lg:text-5xl font-bold"
            variants={fadeInUp}
          >
            Be the statement.
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default WhyOnlyJeans;
