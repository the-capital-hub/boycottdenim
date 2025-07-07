import Navbar2 from "@/Components/Common/Navbar 2";
import UnitedByDenim from "@/Components/Common/UnitedByDenim";
import MatchMaker from "@/Components/ViewProduct-Components/MatchMaker";
import TopTrends from "@/Components/ViewProduct-Components/TopTrends";
import ViewSection from "@/Components/ViewProduct-Components/ViewSection";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar2 />
<ViewSection/>
      <TopTrends />
      <MatchMaker />
      <UnitedByDenim />
    </div>
  );
};

export default page;
