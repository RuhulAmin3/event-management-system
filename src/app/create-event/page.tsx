
import React from 'react'
import CreateEvent from '~/features/create-event'

type Props = {
  params: { id: string }
}

const CreateEventPage = ({ params }: Props) => {
  return (
    <CreateEvent params={params} />
  )
}

export default CreateEventPage