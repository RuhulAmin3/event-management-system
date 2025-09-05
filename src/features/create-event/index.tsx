"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import EventForm from "../event/components/event-form";

const CreateEvent = () => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>
                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Create New Event
                    </h1>
                    <p className="text-muted-foreground">
                        Share your event with the community and bring people together
                    </p>
                </div>
                    <EventForm/>
            </div>
        </div>
    );
};

export default CreateEvent;
