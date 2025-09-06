/**
 * External imports
 */
import { Suspense } from 'react';

/**
 * Internal imports
 */
import CardSkeletonGrid from '~/components/card-skeleton-grid';
import MyEvents from "~/features/my-events"

// This route uses cookies, so it needs to be dynamic
export const dynamic = 'force-dynamic';

const MyEventsPage = () => {
  return (
    <Suspense fallback={
      <div className='my-6'>
        <CardSkeletonGrid />
      </div>
    }>
      <MyEvents />
    </Suspense>
  )
}

export default MyEventsPage
