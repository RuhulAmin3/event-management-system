
import React from 'react'
import EventDetails from '~/features/event-details'

type Props = {
    params: { id: string }
}

const EventDetailsPage = ({ params }: Props) => {
    console.log("params id", params.id);

    return (
        <EventDetails id={params.id} />
    )
}

export default EventDetailsPage