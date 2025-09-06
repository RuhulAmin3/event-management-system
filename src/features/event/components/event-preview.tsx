"use client";
/**
 * External Imports
*/
import { useFormContext } from "react-hook-form";
import Image from "next/image";
/**
 * Internal Imports
*/
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { isValidUrl } from "~/lib/utils";

const EventPreview = () => {
    const { watch } = useFormContext();
    const { title, description, date, time, location, image } = watch();
    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="text-lg">Event Preview</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Image */}
                <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    {image ? (
                        <div className="w-full h-48 relative">
                            {image && isValidUrl(image) && <Image
                                fill
                                src={image}
                                alt={title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />}
                        </div>) : (
                        <p className="text-muted-foreground">Event image preview</p>
                    )}
                </div>

                {/* Title */}
                <h3 className="font-semibold">{title || "Your event title here"}</h3>

                {/* Date & Time */}
                {date && (
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(date).toLocaleDateString()} {time && `at ${time}`}
                    </div>
                )}

                {/* Location */}
                {location && (
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location}
                    </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground mt-4 line-clamp-3">
                    {description || "Event description preview..."}
                </p>
            </CardContent>
        </Card>
    );
};

export default EventPreview;
