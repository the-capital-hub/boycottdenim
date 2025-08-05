'use client';

import React, { useEffect, useState, Suspense } from 'react'; // Import Suspense
import Navbar2 from '@/Components/Common/Navbar 2';
import UnitedByDenim from '@/Components/Common/UnitedByDenim';
import Herosection from '@/Components/Shop-Components/Herosection';
import MoreProducts from '@/Components/Shop-Components/MoreProducts';
import { useSearchParams } from 'next/navigation';

export interface Product {
  _id?: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
  // Add other properties as needed based on your API response
}

const ShopContent = () => { // Create a separate component for the shop content that uses useSearchParams
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Read all potential filters
  const fit = searchParams.get('fit');
  const gender = searchParams.get('gender');
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      let apiUrl = `/api/product/filterProducts?page=1&limit=8`;

      // Add filters if available
      if (fit) apiUrl += `&category=${fit.toLowerCase().replace(/\s/g, '-')}`;
      if (gender) apiUrl += `&gender=${gender.toLowerCase()}`;
      if (category) apiUrl += `&category=${category.toLowerCase()}`;

      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
        setError(err.message || 'An unknown error occurred while fetching products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [fit, gender, category]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Herosection products={products.slice(0, 2)} />
      <MoreProducts products={products.slice(2)} />
    </>
  );
};

const Page = () => {
  return (
    <div>
      <Navbar2 />
      {/* Wrap the component that uses useSearchParams with Suspense */}
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen">
          <p>Loading Shop...</p>
        </div>
      }>
        <ShopContent />
      </Suspense>
      <UnitedByDenim />
    </div>
  );
};

export default Page;
