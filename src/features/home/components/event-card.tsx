/**
 * External Imports
*/
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * Internal Imports
*/

import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Event } from "~/types";


const EventCard = ({ event }: { event: Event }) => {

    const { id, title, description, category, date, time, location, image, categoryColor } = event || {};

    return (
        <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group cursor-pointer bg-gradient-card border-border/50">
            <div className="relative overflow-hidden">
                <div className="w-full h-48 relative">
                    <Image
                        // placeholder="blur"
                        priority
                        fill
                        src={image}
                        alt={title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="absolute top-4 left-4">
                    <Badge
                        variant="secondary"
                        className={`${categoryColor} text-foreground font-medium`}
                    >
                        {category}
                    </Badge>
                </div>
                <div className="absolute top-4 right-4 text-xs text-primary-foreground bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
                    {new Date(date).toLocaleDateString()}
                </div>
            </div>

            <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-primary" />
                        {new Date(date).toLocaleDateString()} • {time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-primary" />
                        {location}
                    </div>
                </div>

                {id ? (
                    <Link href={`/events/${id}`}>
                        <Button className="w-full" variant="outline">
                            View Details
                        </Button>
                    </Link>
                ) : (
                    <Button className="w-full" variant="outline">
                        View Details
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default EventCard;