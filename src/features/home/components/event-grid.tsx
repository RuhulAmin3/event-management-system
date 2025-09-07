/**
 * Internal Imports
*/
import { fetchAllEvents } from "~/app/action";
import EventCard from "./event-card";
import { Event } from "~/types";
import MoreEventButton from "./more-event-btn";

export const dynamic = "force-dynamic";

interface EventsGridProps {
  searchParams: { [key: string]: string | undefined };
}

const EventsGrid = async ({ searchParams }: EventsGridProps) => {
  const { q: searchText, category } = searchParams || {};
  const query = [];

  if (searchText) {
    query.push({ name: "search", value: searchText });
  }

  if (category) {
    query.push({ name: "category", value: category });
  }

  let fetchedEvents: Event[] = [];
  try {
    fetchedEvents = await fetchAllEvents(query);
  } catch (error) {
    console.error("Failed to load events from Event Grid:", error);
    fetchedEvents = [];
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {fetchedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fetchedEvents.map((event: Event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
        <MoreEventButton />
      </div>
    </section>
  );
};

export default EventsGrid;