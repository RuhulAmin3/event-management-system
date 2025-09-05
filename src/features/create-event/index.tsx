import EventForm from "../event/components/event-form";
import BackButton from "~/components/back-button";

const CreateEvent = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <BackButton />
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Create New Event
                    </h1>
                    <p className="text-muted-foreground">
                        Share your event with the community and bring people together
                    </p>
                </div>
                <EventForm />
            </div>
        </div>
    );
};

export default CreateEvent;
