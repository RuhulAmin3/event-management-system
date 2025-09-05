
import React from 'react'
import CreateEvent from '~/features/create-event';

type Props = {
    params: { id: string }
}
const EditEventPage = ({ params }: Props) => {
    const id = params.id;
    return (
        <CreateEvent id={id} />
    )
}

export default EditEventPage