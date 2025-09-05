"use client";

import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Event } from "~/types";
import { getCurrentUser } from "~/lib/local-storage";
import { fetchAllEvents, deleteEvent } from "~/lib/utils"; 
import EventStats from "./components/event-stats";
import EmptyState from "./components/empty-state";
import MyEventCard from "./components/my-event-card";
import Loader from "~/components/ui/loader";


const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const user = getCurrentUser();
      const myEvents = await fetchAllEvents([{ name: "createdBy", value: user }]);
      setEvents(myEvents);
    } catch (err) {
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const result = await deleteEvent(eventId);
      if (result) {
        toast.success("Event deleted successfully");
        setEvents(events.filter((e) => e.id !== eventId)); // immediate UI update
      }
    } catch {
      toast.error("Failed to delete event");
    }
  };

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
        {loading ? (
          <div className="flex items-center justify-center w-full h-[60vh]">
            <Loader size="md" />
          </div>
        ) : events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <MyEventCard key={event.id} event={event} onDelete={handleDeleteEvent} />
              ))}
            </div>
            <EventStats events={events} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default MyEvents;
