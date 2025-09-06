"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getCurrentUser, handleRsvpToggle } from "~/app/action";

import {
  Users,
  Share2,
  Heart,
} from "lucide-react";
import { Event } from "~/types";
import { useState } from "react";


const RsvpSection = ({
  event,
}: {
  event: Event;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRsvps, setIsRsvps] = useState(false);
  
  const handleRsvp = async () => {
    if (!event.id) return;
    try {
      setIsLoading(true);
      const newEvent = await handleRsvpToggle(event.id);
      const userId = await getCurrentUser() as string;
      setIsRsvps(newEvent.rsvps.includes(userId));
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          RSVP
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            {event.rsvps.length} attending
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleRsvp}
          disabled={isLoading}
          className={`w-full h-12 ${isRsvps ? "bg-green-500 hover:bg-green-600" : ""
            }`}
          variant="default"
        >
          {isLoading ? (
            "Processing..."
          ) : isRsvps ? (
            <>
              <Heart className="w-4 h-4 mr-2" />
              You&apos;re Attending
            </>
          ) : (
            <>
              <Users className="w-4 h-4 mr-2" />
              RSVP Now
            </>
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          {isRsvps ? (
            <p>You&apos;ve RSVP&apos;d to this event. We&apos;ll send you updates!</p>
          ) : (
            <p>RSVP to let the organizer know you&apos;re coming</p>
          )}
        </div>

        <div className="border-t pt-4">
          <Button variant="outline" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Event
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">Quick Info</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium">{event.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">RSVPs:</span>
              <span className="font-medium">{event.rsvps.length} people</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span className="font-medium">
                {new Date(event.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


export default RsvpSection;