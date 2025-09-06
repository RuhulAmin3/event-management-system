"use client";
/**
 * External Imports
*/
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

/**
 * Internal Imports
*/
import { Button } from "~/components/ui/button";
import { Event } from "~/types";
import EmptyState from "./empty-state";
import MyEventCard from "./my-event-card";
import EventStats from "./event-stats";
import { deleteEvent } from "~/app/action";

type MyEventsClientProps = {
  initialEvents: Event[];
};

const MyEventsClient = ({ initialEvents: events }: MyEventsClientProps) => {

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const result = await deleteEvent(eventId);
      if (result) {
        toast.success("Event deleted successfully");
      }
    } catch {
      toast.error("Failed to delete event");
    }
  };

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Events</h1>
              <p className="text-muted-foreground">
                Manage and track your created events
              </p>
            </div>
            <Link href="/create-event">
              <Button size="lg" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create New Event
              </Button>
            </Link>
          </div>
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Events</h1>
            <p className="text-muted-foreground">
              Manage and track your created events
            </p>
          </div>
          <Link href="/create-event">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
          </Link>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <MyEventCard key={event.id} event={event} onDelete={handleDeleteEvent} />
          ))}
        </div>
        <EventStats events={events} />
      </div>
    </div>
  );
};

export default MyEventsClient;