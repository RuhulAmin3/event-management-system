"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import EventCard from "./event-card";
import { Event } from "~/types";
import { fetchAllEvents } from "~/lib/utils";

const EventsGrid = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchAllEvents();
      setAllEvents(fetchedEvents);
    };

    loadEvents();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allEvents.map((event: Event) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;