"use client";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Calendar, MapPin, Users, Edit, Trash2, Plus } from "lucide-react";
import { getMyEvents, deleteEvent } from "~/lib/local-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Link from "next/link";
import Image from "next/image";
import { Event } from "~/types";

const MyEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const myEvents = getMyEvents();
    setEvents(myEvents);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    loadEvents(); // Refresh the list
  };
  
  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Events</h1>
            <p className="text-muted-foreground">Manage and track your created events</p>
          </div>
          <Link href="/create-event">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create New Event
            </Button>
          </Link>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 group bg-gradient-card border-border/50">
                <div className="relative overflow-hidden">
                  <Image
                    height={192}
                    width={384}
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${event.categoryColor}`}>
                      {event.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link href={`/edit-event/${event.id}`}>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 backdrop-blur-sm border-0">
                        <Edit className="w-3 h-3 text-white" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-black/20 hover:bg-red-500/80 backdrop-blur-sm border-0">
                          <Trash2 className="w-3 h-3 text-white" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete {event.title} ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteEvent(event.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete Event
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      {event.rsvps.length} RSVPs
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Link href={`/events/${event.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven&apos;t created any events yet. Start by creating your first event and bring people together!
            </p>
            <Link href="/create-event">
              <Button size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Event
              </Button>
            </Link>
          </div>
        )}

        {/* Stats Section */}
        {events.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Your Event Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{events.length}</p>
                    <p className="text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-stats-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-stats-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {events.reduce((total, event) => total + event.rsvps.length, 0)}
                    </p>
                    <p className="text-muted-foreground">Total RSVPs</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {new Set(events.map(event => event.category)).size}
                    </p>
                    <p className="text-muted-foreground">Categories</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEvents;