"use client";
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'

const DraftButton = () => {
    return (
        <Button variant="outline" type="button" onClick={() => toast.warning("Just for demo purpose")}>
            Save as Draft
        </Button>
    )
}

export default DraftButton