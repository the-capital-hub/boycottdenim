import HeroSection from '@/Components/AboutComponents/HeroSection'
import WhyOnlyJeans from '@/Components/AboutComponents/WhyOnlyJeans'
import Navbar2 from '@/Components/Common/Navbar 2'
import UnitedByDenim from '@/Components/Common/UnitedByDenim'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <Navbar2/>
      <HeroSection/>
      <WhyOnlyJeans/>
      <UnitedByDenim/>
    </div>
  )
}

export default page
