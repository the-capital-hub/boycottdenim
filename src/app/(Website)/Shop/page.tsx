'use client'
import React, { useEffect, useState } from 'react'
import Navbar2 from '@/Components/Common/Navbar 2'
import UnitedByDenim from '@/Components/Common/UnitedByDenim'
import Herosection from '@/Components/Shop-Components/Herosection'
import MoreProducts from '@/Components/Shop-Components/MoreProducts'

// import { Product } from '@/types/Product'

export interface Product {
  _id?: string;
  name: string;
  price: number;
  discount?: number;
  image?: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/product/getAllProducts?page=1&limit=8`)
      const data = await res.json()
      setProducts(data.products)
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <Navbar2 />
      <Herosection products={products.slice(0, 2)} />
      <MoreProducts products={products.slice(2)} />
      <UnitedByDenim />
    </div>
  )
}

export default Page
