import { Fragment } from "react";
import dynamic from "next/dynamic";

import FeaturesSection from "./components/feature-section";
import SearchSection from "./components/search-section";
import HeroSection from "./components/hero-section";
import CardSkeletonGrid from "~/components/card-skeleton-grid";

// Dynamically import EventGrid with fallback
const EventsGrid = dynamic(() => import("./components/event-grid"), {
  loading: () => <CardSkeletonGrid />,
});

const Home = () => {
  return (
    <Fragment>
      <HeroSection />
      <SearchSection />
      <EventsGrid />
      <FeaturesSection />
    </Fragment>
  );
};

export default Home;