import { Fragment } from 'react'

import FeaturesSection from './components/feature-section'
import SearchSection from './components/search-section'
import HeroSection from './components/hero-section'
import EventsGrid from './components/event-grid'

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <SearchSection />
      <EventsGrid />
      <FeaturesSection />
    </Fragment>
  )
}

export default Home;

