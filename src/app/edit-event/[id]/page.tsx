import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EventForm from '~/features/event/components/event-form';
import { EventFormValues } from '~/features/event/schema';
import { getSingleEvent } from '~/lib/utils';

type Props = {
    params: Promise<{ id: string }>
}

const EditEventPage = async ({ params }: Props) => {
    const { id } = await params;
    const event = await getSingleEvent(id);
    if (!event) return notFound();
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/my-events" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to My Events
                </Link>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Edit Event</h1>
                    <p className="text-muted-foreground">
                        Update your event details and save changes
                    </p>
                </div>
                <EventForm defaultValues={event as EventFormValues} id={id} />
            </div>
        </div>
    )
}

export default EditEventPage