import React from 'react'
import Loader from '~/components/ui/loader'

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[60vh]">
      <Loader size="md" />
    </div>
  )
}

export default Loading