"use client";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import techSummit from "~/assets/tech-summit.jpg";
import networkingEvent from "~/assets/networking-event.jpg";
import musicFestival from "~/assets/music-festival.jpg";
import marathon from "~/assets/marathon.jpg";
import artExhibition from "~/assets/art-exhibition.jpg";
import cookingClass from "~/assets/cooking-class.jpg";
import EventCard from "./event-card";
import { getAllEvents } from "~/lib/local-storage";
import { Event } from "~/types";

const sampleEvents: Event[] = [
  {
    id: "sample_1",
    title: "Tech Innovation Summit",
    description: "Join industry leaders discussing the future of technology and innovation.",
    category: "Technology",
    date: "Dec 15, 2024",
    time: "9:00 AM",
    location: "San Francisco, CA",
    image: techSummit,
    categoryColor: "bg-blue-100 text-blue-800",
    createdBy: "sample_organizer",
    rsvps: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "sample_2",
    title: "Business Networking Night",
    description: "Connect with professionals and expand your business network.",
    category: "Business",
    date: "Dec 18, 2024",
    time: "6:00 PM",
    location: "New York, NY",
    image: networkingEvent,
    categoryColor: "bg-green-100 text-green-800",
    createdBy: "sample_organizer",
    rsvps: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "sample_3",
    title: "Summer Music Festival",
    description: "Experience amazing live performances from top artists.",
    category: "Entertainment",
    date: "Dec 20, 2024",
    time: "2:00 PM",
    location: "Los Angeles, CA",
    image: musicFestival,
    categoryColor: "bg-purple-100 text-purple-800",
    createdBy: "sample_organizer",
    rsvps: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "sample_4",
    title: "City Marathon 2024",
    description: "Join thousands of runners in this annual city marathon event.",
    category: "Sports",
    date: "Dec 22, 2024",
    time: "7:00 AM",
    location: "Chicago, IL",
    image: marathon,
    categoryColor: "bg-orange-100 text-orange-800",
    createdBy: "sample_organizer",
    rsvps: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "sample_5",
    title: "Modern Art Exhibition",
    description: "Explore contemporary artworks from emerging artists.",
    category: "Art",
    date: "Dec 25, 2024",
    time: "10:00 AM",
    location: "Seattle, WA",
    image: artExhibition,
    categoryColor: "bg-pink-100 text-pink-800",
    createdBy: "sample_organizer",
    rsvps: [],
    createdAt: new Date().toISOString()
  },
  {
    id: "sample_6",
    title: "Culinary Masterclass",
    description: "Learn advanced cooking techniques from professional chefs.",
    category: "Workshop",
    date: "Dec 28, 2024",
    time: "3:00 PM",
    location: "Miami, FL",
    image: cookingClass,
    categoryColor: "bg-yellow-100 text-yellow-800",
    createdBy: "sample_organizer",
    rsvps: [],
    createdAt: new Date().toISOString()
  }
];

const EventsGrid = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Load events from localStorage
    const savedEvents = getAllEvents();
    // Combine with sample events
    const combinedEvents = [...savedEvents, ...sampleEvents];
    setAllEvents(combinedEvents);
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