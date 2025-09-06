import { Fragment, Suspense } from "react";

import FeaturesSection from "./components/feature-section";
import SearchSection from "./components/search-section";
import HeroSection from "./components/hero-section";
import CardSkeletonGrid from "~/components/card-skeleton-grid";
import EventsGrid from "./components/event-grid";


const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <SearchSection />
      <Suspense fallback={<CardSkeletonGrid />}>
        <EventsGrid />
      </Suspense>
      <FeaturesSection />
    </Fragment>
  );
};

export default Home;