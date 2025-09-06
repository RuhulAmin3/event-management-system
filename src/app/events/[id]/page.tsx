import { notFound } from 'next/navigation';
import { getSingleEvent } from '~/app/action';
import EventDetail from '~/features/event-details';
import { Event } from '~/types';

type Props = {
    params: Promise<{ id: string }>
}
const EventDetailsPage = async ({ params }: Props) => {
    const { id } = await params;
    const event: Event = await getSingleEvent(id);
    if (!event) return notFound();
    return (
        <EventDetail event={event} />
    )
}

export default EventDetailsPage;