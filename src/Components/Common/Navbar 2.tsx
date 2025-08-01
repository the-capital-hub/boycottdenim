"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PT_Mono } from "next/font/google";
import { Menu, X } from "lucide-react";
import logo from "../../../public/boycott-logo.png";
import search from "../../../public/search2.png";
import cart from "../../../public/Cart 2.svg";
import user from "../../../public/user2.png";
import { useAdmin } from "../../../hooks/useAdmin";

const ptMono = PT_Mono({
	weight: ["400"],
	subsets: ["latin"],
	display: "swap",
});



const Navbar = ({ isDark = true }: { isDark?: boolean }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const {isAdmin, loading} = useAdmin();

  // if (loading) return null;

  console.log(isAdmin);


  

const NavLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/Shop" },
  { name: "Genz", href: "/GenZ" },
  { name: "About Us", href: "/AboutUs" },
  { name: "Contact Us", href: "/ContactUs" },
  ...(isAdmin ? [{ name: "Add Product", href: "/AdminAddProduct" }] : [])
];

	const hoverText = isDark ? "hover:text-black" : "hover:text-black";
	const textColor = isDark ? "text-gray-700" : "text-gray-800";
	const activeTextColor = isDark ? "text-black" : "text-gray-900";

	const handleSearchMouseEnter = () => {
		setIsSearchOpen(true);
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
	};

	const handleSearchMouseLeave = () => {
		if (searchValue === "") {
			closeTimeoutRef.current = setTimeout(() => {
				setIsSearchOpen(false);
			}, 1000);
		}
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	useEffect(() => {
		if (searchValue === "" && isSearchOpen) {
			closeTimeoutRef.current = setTimeout(() => {
				setIsSearchOpen(false);
			}, 2000);
		}

		return () => {
			if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
		};
	}, [searchValue, isSearchOpen]);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	return (
		<div
			className={`absolute top-0 left-0 right-0 w-full z-50 my-4 bg-transparent ${ptMono.className}`}
		>
			<div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
				{/* Logo */}
				<div>
					<Image
						src={logo}
						alt="boycott logo"
						width={120}
						className="w-24 md:w-[120px]"
					/>
				</div>

				<div className="hidden lg:flex gap-6">
					{NavLinks.map((link, index) => (
						<motion.div
							key={link.href}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1, duration: 0.3 }}
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							<Link
								href={link.href}
								className={`transition-all duration-300 ease-in-out ${
									pathname === link.href
										? `${activeTextColor} font-bold`
										: `${textColor} ${hoverText}`
								} hover:scale-105`}
							>
								{link.name}
							</Link>
						</motion.div>
					))}
				</div>

				{/* Icons Section */}
				<div className="flex gap-4 items-center">
					<div
						className="relative hidden md:flex items-center"
						ref={searchContainerRef}
						onMouseEnter={handleSearchMouseEnter}
						onMouseLeave={handleSearchMouseLeave}
					>
						<AnimatePresence>
							{isSearchOpen && (
								<motion.input
									initial={{ width: 0, opacity: 0 }}
									animate={{ width: 200, opacity: 1 }}
									exit={{ width: 0, opacity: 0 }}
									transition={{ duration: 0.3, ease: "easeInOut" }}
									type="text"
									placeholder="Search..."
									value={searchValue}
									onChange={handleSearchChange}
									autoFocus
									className={`absolute right-12 bg-transparent ${textColor} px-3 py-2 rounded-2xl border border-black focus:outline-none focus:outline-black transition-colors`}
								/>
							)}
						</AnimatePresence>

						<motion.div
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.9 }}
							className="cursor-pointer"
						>
							<Image
								src={search}
								alt="search icon"
								width={50}
								className="w-10 md:w-[50px]"
							/>
						</motion.div>
					</div>

					<motion.div
						whileHover={{ scale: 1.1, y: -2 }}
						whileTap={{ scale: 0.9 }}
						className="cursor-pointer"
					>
						<Link href="/Cart">
							<Image
								src={cart}
								alt="cart icon"
								width={50}
								className="w-10 md:w-[50px]"
							/>
						</Link>
					</motion.div>

					<Link href="/Register">
						<motion.div
							whileHover={{ scale: 1.1, y: -2 }}
							whileTap={{ scale: 0.9 }}
							className="cursor-pointer"
						>
							<Image
								src={user}
								alt="profile icon"
								width={50}
								className="w-10 md:w-[50px]"
							/>
						</motion.div>
					</Link>

					{/* Mobile Menu Button */}
					<motion.button
						onClick={toggleMobileMenu}
						className={`lg:hidden p-2 ${textColor} ${hoverText} transition-colors duration-200`}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						aria-label="Toggle mobile menu"
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</motion.button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
						onClick={closeMobileMenu}
					/>
				)}
			</AnimatePresence>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -20, scale: 0.95 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="absolute top-full left-4 right-4 mt-2 bg-white/50 bg-opacity-50 backdrop-blur-lg rounded-lg shadow-xl border border-gray-600 lg:hidden z-50"
					>
						<div className="p-4 space-y-1">
							{/* Mobile Search */}
							<div className="mb-4 md:hidden">
								<input
									type="text"
									placeholder="Search..."
									className={`w-full bg-transparent ${textColor} px-3 py-2 rounded-lg border border-black focus:outline-none focus:outline-black transition-colors`}
								/>
							</div>

							{NavLinks.map((link, index) => (
								<motion.div
									key={link.href}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ duration: 0.2, delay: index * 0.05 }}
								>
									<Link
										href={link.href}
										onClick={closeMobileMenu}
										className={`block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
											pathname === link.href
												? `${activeTextColor} text-black text-xl font-bold`
												: `text-black hover:black  ${hoverText}`
										}`}
									>
										{link.name}
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Navbar;
