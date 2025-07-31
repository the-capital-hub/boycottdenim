import Navbar from "@/Components/Common/Navbar";
import UnitedByDenim from "@/Components/Common/UnitedByDenim";
import HeroSection from "@/Components/home-components/HeroSection";
import ItsAboutBoycottSection from "@/Components/home-components/ItsAboutBoycottSection";
import JeanType from "@/Components/home-components/JeanType";
import ShopMore from "@/Components/home-components/ShopMore";
import Testimonial from "@/Components/home-components/Testimonial";
import HomeBannerGrid from "@/Components/home-components/category";
import React from "react";

const Home = () => {
	return (
		<div className="hide-scrollbar-mobile hide-scrollbar">
			<Navbar />
			<HeroSection />
			<ItsAboutBoycottSection />
			<JeanType />
			<HomeBannerGrid />
			<ShopMore />
			<Testimonial />
			<UnitedByDenim />
		</div>
	);
};

export default Home;
