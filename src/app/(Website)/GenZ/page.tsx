import Navbar2 from '@/Components/Common/Navbar 2'
import UnitedByDenim from '@/Components/Common/UnitedByDenim'
import ExclusiveSection from '@/Components/Genz-Component/ExclusiveSection'
import GenzFitsSection from '@/Components/Genz-Component/GenzFitsSection'
import HeroSection from '@/Components/Genz-Component/HeroSection'
import NewStyle from '@/Components/Genz-Component/NewStyle'
import React from 'react'

const page = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <div>
      <Navbar2/>
      <HeroSection/>
      <GenzFitsSection activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
      <ExclusiveSection/>
      <NewStyle/>
      <UnitedByDenim/>
    </div>
  )
}

export default page
