"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import EventCard from "./event-card";
import { getAllEvents } from "~/lib/local-storage";
import { Event } from "~/types";
import { fetchAllEvents } from "~/lib/utils";

const EventsGrid = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      // Step 1: Fetch events from API (or wherever)
      const fetchedEvents = await fetchAllEvents();

      // Step 2: Get saved events from localStorage
      const savedEvents = getAllEvents();

      // Step 3: Combine logic — example: saved + fetched + sample (avoid dups)
      const combinedEvents = [...savedEvents];

      // Add fetched events if not already present
      fetchedEvents.forEach((fetchedEvent) => {
        if (!combinedEvents.some((e) => e.id === fetchedEvent.id)) {
          combinedEvents.push(fetchedEvent);
        }
      });

      // Step 4: Update state
      setAllEvents(combinedEvents);
    };

    loadEvents(); // 🔥 Call the async function
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