import { Event } from "~/types";
import BackButton from "~/components/back-button";
import EventHeader from "./components/event-header";
import EventDescription from "./components/event-description";
import OrganizerInfo from "./components/organizer-info";
import RsvpSection from "./components/revp-section";

const EventDetail = ({ event }: { event: Event }) => {
   return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <EventHeader event={event} />
            <EventDescription event={event} />
            <OrganizerInfo createdBy={event.createdBy} />
          </div>

          {/* Right Side */}
          <div className="lg:col-span-1">
            <RsvpSection
              event={event}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
