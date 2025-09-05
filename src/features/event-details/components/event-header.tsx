import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Event } from "~/types";

const EventHeader = ({ event }: { event: Event }) => (
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
      <Badge className={`${event.categoryColor} mb-3`}>{event.category}</Badge>
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
        {event.title}
      </h1>
      <div className="flex items-center space-x-4 text-white/90">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(event.date).toLocaleDateString()}
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
);

export default EventHeader;