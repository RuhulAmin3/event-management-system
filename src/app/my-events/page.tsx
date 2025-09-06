/**
 * External imports
 */
import { Suspense } from 'react';

/**
 * Internal imports
 */
import CardSkeletonGrid from '~/components/card-skeleton-grid';
import MyEvents from "~/features/my-events"

const MyEventsPage = () => {
  return (
    <Suspense fallback={<CardSkeletonGrid />}>
      <MyEvents />
    </Suspense>
  )
}

export default MyEventsPage