import { Event } from "~/types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import {
    Calendar,
    Clock,
    MapPin,
} from "lucide-react";
const EventDescription = ({ event }: { event: Event }) => (
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
                            <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString()}
                            </p>
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
);

export default EventDescription;