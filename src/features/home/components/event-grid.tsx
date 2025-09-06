/**
 * Internal Imports
*/
import { fetchAllEvents } from "~/app/action";
import EventCard from "./event-card";
import { Event } from "~/types";
import MoreEventButton from "./more-event-btn";

export const dynamic = "force-dynamic";

const EventsGrid = async () => {
  let fetchedEvents: Event[] = [];
  try {
    fetchedEvents = await fetchAllEvents();
  } catch (error) {
    console.error("Failed to load events from Event Grid:", error);
    // Return empty grid on error - this prevents build failure
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