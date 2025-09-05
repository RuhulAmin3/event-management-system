"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Calendar, MapPin, Users, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
import { Event } from "~/types";

interface EventCardProps {
  event: Event;
  onDelete: (id: string) => void;
}

const MyEventCard = ({ event, onDelete }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group bg-gradient-card border-border/50">
      <div className="relative overflow-hidden">
        <Image
          height={192}
          width={384}
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute top-4 left-4">
          <Badge className={`${event.categoryColor}`}>{event.category}</Badge>
        </div>

        <div className="absolute top-4 right-4 flex space-x-2">
          <Link href={`/edit-event/${event.id}`}>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 backdrop-blur-sm border-0"
            >
              <Edit className="w-3 h-3 text-white" />
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-black/20 hover:bg-red-500/80 backdrop-blur-sm border-0"
              >
                <Trash2 className="w-3 h-3 text-white" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Event</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <b>{event.title}</b>? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(event.id)}
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
            {new Date(event.date).toLocaleDateString()} • {event.time}
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

        <Link href={`/events/${event.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default MyEventCard;
