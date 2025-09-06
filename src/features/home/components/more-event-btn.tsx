"use client";

import React from 'react'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'

const MoreEventButton = () => {
    return (
        <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => toast.warning("Just for demo purpose")}>
                Load More Events
            </Button>
        </div>
    )
}

export default MoreEventButton