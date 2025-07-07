"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PT_Mono } from "next/font/google";
import AboutImg from "../../../public/about us image.png";

const ptMono = PT_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const HeroSection = () => {
  return (
    <section className="min-h-screen py-22 flex items-center justify-center bg-white">
      <div className="max-w-7xl w-full px-6 lg:px-8">
        <div className={`${ptMono.className}`}>
          {/*  DESKTOP VIEW */}
          <div className="hidden lg:grid grid-cols-2 gap-10 items-center">
            {/* LEFT TEXT SECTION */}
            <div className="space-y-6">
              <h1 className="text-[150px] font-bold leading-tight text-black">
                About <br /> Us
              </h1>

              <h2 className="text-[64px] font-semibold text-black">
                Boy Cott
              </h2>

              <div className="space-y-1 text-[40px]">
                <p className="text-black font-medium">
                  We don’t follow fashion.
                </p>
                <p className="text-black font-medium">We follow purpose.</p>
              </div>

              <div className="text-[20px] text-gray-700 leading-relaxed space-y-6 w-full lg:w-[100vw] xl:w-[90vw]">
                <p>
                  At <span className="font-bold text-black">Boy Cott</span>,
                  we’ve made a bold decision – to master one thing and one
                  thing only: jeans. While the world jumps from trend to trend,
                  we stay rooted in what we believe: denim is not just a fabric
                  – it’s a culture, a statement, a lifestyle.
                </p>
                <p>
                  We built Boy Cott for people who know who they are. People
                  who don’t need loud logos or fancy hype to stand out. People
                  who believe in quality over quantity, style over noise, and
                  real over fake.
                </p>
                <p>
                  Every pair of Boy Cott jeans is designed from the ground up –
                  crafted for fit, built for durability, and finished with
                  attitude.
                </p>
                <p className="text-black text-center font-medium text-3xl w-full">
                  We’re here to give you the{" "}
                  <span className="font-bold">one perfect</span> fit you’ve
                  been waiting for.
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE SECTION */}
            <div className="relative">
              <Image
                src={AboutImg}
                alt="Boy Cott jeans back view"
                className="rounded-l-[40px] w-[550px] object-cover relative -top-44 left-26"
              />

              {/* Explore More Button */}
              <div className="relative w-[120px] h-[120px] -top-120 right-38 cursor-pointer">
                {/* Black Circle Button */}
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center cursor-pointer">
                  {/* Arrow Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="17 13 17 7 11 7" />
                  </svg>
                </div>

                {/* Rotating Text Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 -m-6"
                >
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    <defs>
                      <path
                        id="circlePath"
                        d="M 100, 100
                          m -80, 0
                          a 80,80 0 1,1 160,0
                          a 80,80 0 1,1 -160,0"
                      />
                    </defs>
                    <text
                      fill="black"
                      fontSize="12"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      <textPath href="#circlePath" startOffset="0%" className="text-3xl">
                        EXPLORE MORE •
                      </textPath>
                      <textPath href="#circlePath" startOffset="50%" className="text-3xl">
                        EXPLORE MORE •
                      </textPath>
                    </text>
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/*  MOBILE VIEW*/}
          <div className="lg:hidden flex flex-col items-center text-center gap-6">
            {/* TITLE */}
            <h1 className="text-[60px] font-bold leading-tight text-black">
              About Us
            </h1>

            <h2 className="text-[32px] font-semibold text-black">Boy Cott</h2>

            <div className="space-y-1 text-[20px]">
              <p className="text-black font-medium">
                We don’t follow fashion.
              </p>
              <p className="text-black font-medium">We follow purpose.</p>
            </div>

            {/* IMAGE */}
            <div className="relative w-full flex justify-center">
              <Image
                src={AboutImg}
                alt="Boy Cott jeans"
                className="rounded-[20px] w-[90%] object-cover"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="text-[14px] text-gray-700 leading-relaxed space-y-4 px-2">
              <p>
                At <span className="font-bold text-black">Boy Cott</span>, we’ve
                made a bold decision – to master one thing and one thing only:
                jeans. While the world jumps from trend to trend, we stay rooted
                in what we believe: denim is not just a fabric – it’s a culture,
                a statement, a lifestyle.
              </p>
              <p>
                We built Boy Cott for people who know who they are. People who
                don’t need loud logos or fancy hype to stand out. People who
                believe in quality over quantity, style over noise, and real
                over fake.
              </p>
              <p>
                Every pair of Boy Cott jeans is designed from the ground up –
                crafted for fit, built for durability, and finished with
                attitude.
              </p>
              <p className="text-black text-center font-medium text-[20px]">
                We’re here to give you the{" "}
                <span className="font-bold">one perfect</span> fit you’ve been
                waiting for.
              </p>
            </div>

            {/* Explore Button */}
            <div className="relative w-[70px] h-[70px] cursor-pointer">
              {/* Black Circle */}
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="17 13 17 7 11 7" />
                </svg>
              </div>

              {/* Rotating Text */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 -m-4"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePathMobile"
                      d="M 100, 100
                        m -80, 0
                        a 80,80 0 1,1 160,0
                        a 80,80 0 1,1 -160,0"
                    />
                  </defs>
                  <text
                    fill="black"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    <textPath href="#circlePathMobile" startOffset="0%" className="text-2xl">
                      EXPLORE MORE •
                    </textPath>
                    <textPath href="#circlePathMobile" startOffset="50%" className="text-2xl">
                      EXPLORE MORE •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
