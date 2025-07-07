import Navbar2 from '@/Components/Common/Navbar 2'
import UnitedByDenim from '@/Components/Common/UnitedByDenim'
import Herosection from '@/Components/Shop-Components/Herosection'
import MoreProducts from '@/Components/Shop-Components/MoreProducts'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar2/>
        <Herosection/>
        <MoreProducts/>
        <UnitedByDenim/>
      
    </div>
  )
}

export default page
