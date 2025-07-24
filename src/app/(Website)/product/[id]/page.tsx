'use client';

import Navbar2 from "@/Components/Common/Navbar 2";
import UnitedByDenim from "@/Components/Common/UnitedByDenim";
import MatchMaker from "@/Components/ViewProduct-Components/MatchMaker";
import TopTrends from "@/Components/ViewProduct-Components/TopTrends";
import ViewSection from "@/Components/ViewProduct-Components/ViewSection";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface Product {
  _id?: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  description?: string;
  color?: string;
  size?: string[];
}

const Page = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/${id}/getProductById`);
        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  return (
    <div>
      <Navbar2 />
      <ViewSection product={product} />
      <TopTrends />
      <MatchMaker />
      <UnitedByDenim />
    </div>
  );
};

export default Page;
