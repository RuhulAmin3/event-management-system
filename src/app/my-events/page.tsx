/**
 * External imports
 */
import dynamic from 'next/dynamic';

/**
 * Internal imports
 */
import CardSkeletonGrid from '~/components/card-skeleton-grid';

const MyEvents = dynamic(() => import("~/features/my-events"), {
  loading: () => <CardSkeletonGrid />,
});

const MyEventsPage = () => {
  return (
    <MyEvents/>
  )
}

export default MyEventsPage