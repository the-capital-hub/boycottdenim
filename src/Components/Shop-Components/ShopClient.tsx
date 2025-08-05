'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import Herosection from './Herosection';
import MoreProducts from './MoreProducts';
import UnitedByDenim from '../Common/UnitedByDenim';
import Navbar2 from '../Common/Navbar 2';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
}

const ShopClient = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();

  // Read all potential filters
  const fit = searchParams.get('fit');
  const gender = searchParams.get('gender');
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      let apiUrl = `/api/product/filterProducts?page=1&limit=8`;

      // Add filters if available
      if (fit) apiUrl += `&category=${fit.toLowerCase().replace(/\s/g, '-')}`;
      if (gender) apiUrl += `&gender=${gender.toLowerCase()}`;
      if (category) apiUrl += `&category=${category.toLowerCase()}`;

      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, [fit, gender, category]);

  return (
    <div>
      <Navbar2 />
      <Herosection products={products.slice(0, 2)} />
      <MoreProducts products={products.slice(2)} />
      <UnitedByDenim />
    </div>
  );
};

export default ShopClient;
