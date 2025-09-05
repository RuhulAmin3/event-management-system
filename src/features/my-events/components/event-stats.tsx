import { Card } from "~/components/ui/card";
import { Calendar, Users, MapPin } from "lucide-react";
import { Event } from "~/types";

const EventStats = ({ events }: { events: Event[] }) => {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Your Event Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{events.length}</p>
            <p className="text-muted-foreground">Total Events</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-3">
          <div className="w-12 h-12 bg-stats-accent/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-stats-accent" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {events.reduce((total, event) => total + event.rsvps.length, 0)}
            </p>
            <p className="text-muted-foreground">Total RSVPs</p>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {new Set(events.map((event) => event.category)).size}
            </p>
            <p className="text-muted-foreground">Categories</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EventStats;
