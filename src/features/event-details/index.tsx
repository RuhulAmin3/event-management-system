"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, Heart } from "lucide-react";

import { rsvpToEvent, unRsvpFromEvent } from "~/lib/local-storage";
import Link from "next/link";
import Image from "next/image";
import { Event } from "~/types";
import { notFound } from "next/navigation";

const EventDetail = ({ event }: { event: Event }) => {
  const [isRsvped, setIsRsvped] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRsvp = async () => {
    if (!event.id) return;

    setLoading(true);
    try {
      if (isRsvped) {
        unRsvpFromEvent(event.id);
        setIsRsvped(false);
      } else {
        rsvpToEvent(event.id);
        setIsRsvped(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Header */}
            <div className="relative overflow-hidden rounded-lg">
              <Image
                width={768}
                height={384}
                src={event.image}
                alt={event.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <Badge className={`${event.categoryColor} mb-3`}>
                  {event.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {event.title}
                </h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Event Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Time</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary mr-3" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Event Organizer</p>
                    <p className="text-sm text-muted-foreground">Host ID: {event.createdBy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RSVP Section */}
          <div className="lg:col-span-1">
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
                  disabled={loading}
                  className={`w-full h-12 ${isRsvped ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  variant={isRsvped ? "default" : "default"}
                >
                  {loading ? (
                    "Processing..."
                  ) : isRsvped ? (
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
                  {isRsvped ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;