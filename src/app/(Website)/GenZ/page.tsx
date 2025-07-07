import Navbar2 from '@/Components/Common/Navbar 2'
import UnitedByDenim from '@/Components/Common/UnitedByDenim'
import ExclusiveSection from '@/Components/Genz-Component/ExclusiveSection'
import GenzFitsSection from '@/Components/Genz-Component/GenzFitsSection'
import HeroSection from '@/Components/Genz-Component/HeroSection'
import NewStyle from '@/Components/Genz-Component/NewStyle'
import React from 'react'

const page = () => {
  return (
    <div>
      <Navbar2/>
      <HeroSection/>
      <GenzFitsSection/>
     <ExclusiveSection/>
     <NewStyle/>
      <UnitedByDenim/>
    </div>
  )
}

export default page
