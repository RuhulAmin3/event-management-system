"use client";

import { useState, useEffect } from "react";
import { Event } from "~/types";
import { getCurrentUser } from "~/lib/local-storage";
import { handleRsvpToggle } from "~/lib/utils";
import BackButton from "~/components/back-button";
import EventHeader from "./components/event-header";
import EventDescription from "./components/event-description";
import OrganizerInfo from "./components/organizer-info";
import RsvpSection from "./components/revp-section";

const EventDetail = ({ event }: { event: Event }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRsvps, setIsRsvps] = useState(false);

  // keep RSVP state in sync if already joined
  useEffect(() => {
    const userId = getCurrentUser();
    if (event.rsvps.includes(userId)) {
      setIsRsvps(true);
    }
  }, [event]);

  const handleRsvp = async () => {
    if (!event.id) return;
    try {
      setIsLoading(true);
      const userId = getCurrentUser();
      const newEvent = await handleRsvpToggle(event.id, userId);
      setIsRsvps(newEvent.rsvps.includes(userId));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

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
              isRsvps={isRsvps}
              isLoading={isLoading}
              onToggle={handleRsvp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
