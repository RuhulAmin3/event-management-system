import React from 'react'
import Loader from '~/components/ui/loader'

const loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-[60vh]">
            <Loader size="lg" />
        </div>
    )
}

export default loading