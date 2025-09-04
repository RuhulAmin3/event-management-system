
import React from 'react'
import HeroSection from './components/hero-section'
import SearchSection from './components/search-section'
import EventsGrid from './components/event-grid'
import FeaturesSection from './components/feature-section'

const Home = () => {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <EventsGrid />
      <FeaturesSection />
    </>
  )
}

export default Home;

