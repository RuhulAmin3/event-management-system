"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { ArrowLeft, Calendar, Clock, MapPin, Tag, Users, Target, Clock4, MapPin as Location } from "lucide-react";
import { useToast } from "~/hooks/use-toast";
import { saveEvent, getCurrentUser, getEventById } from "~/lib/local-storage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Event } from "~/types";

const CreateEvent = ({id}:{id?:string}) => {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: ""
    });

    const isEditing = Boolean(id);

    // Load event data if editing
    useEffect(() => {
        if (isEditing && id) {
            const existingEvent = getEventById(id);
            if (existingEvent) {
                setEventData({
                    title: existingEvent.title,
                    description: existingEvent.description,
                    date: existingEvent.date,
                    time: existingEvent.time,
                    location: existingEvent.location,
                    category: existingEvent.category
                });
            } else {
                router.push('/my-events');
                toast({
                    title: "Event not found",
                    description: "The event you're trying to edit doesn't exist.",
                    variant: "destructive"
                });
            }
        }
    }, [id, isEditing, router, toast]);

    const validateForm = () => {
        const errors = [];

        if (!eventData.title.trim()) errors.push("Event title is required");
        if (!eventData.description.trim()) errors.push("Event description is required");
        if (!eventData.date) errors.push("Event date is required");
        if (!eventData.time) errors.push("Event time is required");
        if (!eventData.location.trim()) errors.push("Event location is required");
        if (!eventData.category) errors.push("Event category is required");

        return errors;
    };

    const handleSubmit = async (isDraft = false) => {
        const errors = validateForm();

        if (errors.length > 0 && !isDraft) {
            toast({
                title: "Please fill in all required fields",
                description: errors.join(", "),
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const eventId = id || `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

            const event: Event = {
                id: eventId,
                title: eventData.title,
                description: eventData.description,
                category: eventData.category,
                date: eventData.date,
                time: eventData.time,
                location: eventData.location,
                image: getRandomEventImage(),
                categoryColor: getCategoryColor(eventData.category),
                createdBy: getCurrentUser(),
                rsvps: isEditing ? (getEventById(id!)?.rsvps || []) : [],
                createdAt: isEditing ? (getEventById(id!)?.createdAt || new Date().toISOString()) : new Date().toISOString()
            };

            saveEvent(event);

            toast({
                title: isEditing ? "Event updated successfully!" : "Event created successfully!",
                description: isDraft ? "Your event has been saved as a draft." : "Your event is now live and visible to everyone."
            });

            router.push('/my-events');
        } catch (error) {
            toast({
                title: "Error",
                description: "There was an error saving your event. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getRandomEventImage = () => {
        const images = [
            '/src/assets/tech-summit.jpg',
            '/src/assets/networking-event.jpg',
            '/src/assets/music-festival.jpg',
            '/src/assets/marathon.jpg',
            '/src/assets/art-exhibition.jpg',
            '/src/assets/cooking-class.jpg'
        ];
        return images[Math.floor(Math.random() * images.length)];
    };

    const getCategoryColor = (category: string) => {
        const colorMap: { [key: string]: string } = {
            'conference': 'bg-blue-100 text-blue-800',
            'workshop': 'bg-green-100 text-green-800',
            'networking': 'bg-purple-100 text-purple-800',
            'social': 'bg-pink-100 text-pink-800',
            'sports': 'bg-orange-100 text-orange-800',
            'arts': 'bg-red-100 text-red-800',
            'food': 'bg-yellow-100 text-yellow-800',
            'music': 'bg-indigo-100 text-indigo-800',
            'tech': 'bg-blue-100 text-blue-800',
            'business': 'bg-gray-100 text-gray-800'
        };
        return colorMap[category] || 'bg-gray-100 text-gray-800';
    };

    const tips = [
        {
            icon: Target,
            title: "Be Specific",
            description: "Include clear details about what attendees can expect"
        },
        {
            icon: Clock4,
            title: "Plan Ahead",
            description: "Give people enough time to plan and register"
        },
        {
            icon: Users,
            title: "Know Your Audience",
            description: "Tailor your event description to your target attendees"
        },
        {
            icon: Location,
            title: "Clear Location",
            description: "Provide detailed location or online meeting information"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {isEditing ? 'Edit Event' : 'Create New Event'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEditing
                            ? 'Update your event details and save changes'
                            : 'Share your event with the community and bring people together'
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Event Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Event Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">
                                Event Title <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="title"
                                placeholder="Give your event a compelling title"
                                value={eventData.title}
                                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                                className="h-12"
                            />
                            <p className="text-xs text-muted-foreground">Choose a clear, descriptive title that captures attention</p>
                        </div>

                        {/* Event Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">
                                Event Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Describe what makes your event special. Include key details, agenda, speakers, or activities that attendees can expect."
                                value={eventData.description}
                                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                                className="min-h-[120px] resize-none"
                            />
                            <p className="text-xs text-muted-foreground">Help people understand what to expect at your event</p>
                        </div>

                        {/* Date and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-sm font-medium">
                                    Event Date <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="date"
                                        type="date"
                                        value={eventData.date}
                                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                                        className="pl-10 h-12"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="time" className="text-sm font-medium">
                                    Start Time <span className="text-destructive">*</span>
                                </Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="time"
                                        type="time"
                                        value={eventData.time}
                                        onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                                        className="pl-10 h-12"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-medium">
                                Location <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    placeholder="Enter venue name, address, or online platform"
                                    value={eventData.location}
                                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                                    className="pl-10 h-12"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">Include full address or online meeting details</p>
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium">
                                Category <span className="text-destructive">*</span>
                            </Label>
                            <Select value={eventData.category} onValueChange={(value) => setEventData({ ...eventData, category: value })}>
                                <SelectTrigger className="h-12">
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                                        <SelectValue placeholder="Select event category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="conference">Conference</SelectItem>
                                    <SelectItem value="workshop">Workshop</SelectItem>
                                    <SelectItem value="networking">Networking</SelectItem>
                                    <SelectItem value="social">Social</SelectItem>
                                    <SelectItem value="sports">Sports</SelectItem>
                                    <SelectItem value="arts">Arts & Culture</SelectItem>
                                    <SelectItem value="food">Food & Dining</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="tech">Technology</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button
                                variant="outline"
                                className="h-12"
                                onClick={() => handleSubmit(true)}
                                disabled={isSubmitting}
                            >
                                <span className="mr-2">📝</span>
                                Save as Draft
                            </Button>
                            <Button
                                className="h-12 flex-1"
                                size="lg"
                                onClick={() => handleSubmit(false)}
                                disabled={isSubmitting}
                            >
                                <span className="mr-2">{isEditing ? '✓' : '+'}</span>
                                {isSubmitting
                                    ? 'Saving...'
                                    : isEditing
                                        ? 'Update Event'
                                        : 'Create Event'
                                }
                            </Button>
                            <Link href={isEditing ? '/my-events' : '/'}>
                                <Button variant="ghost" className="h-12 w-full" disabled={isSubmitting}>
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Event Preview */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="text-lg">Event Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Preview Image Placeholder */}
                                <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                                    <div className="text-center text-muted-foreground">
                                        <div className="w-8 h-8 mx-auto mb-2 opacity-50">📷</div>
                                        <p className="text-sm">Event Image</p>
                                    </div>
                                </div>

                                {/* Preview Content */}
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-sm">
                                        {eventData.title || "Your event title will appear here"}
                                    </h3>

                                    {eventData.date && (
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {new Date(eventData.date).toLocaleDateString()}
                                            {eventData.time && ` at ${eventData.time}`}
                                        </div>
                                    )}

                                    {eventData.location && (
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {eventData.location}
                                        </div>
                                    )}

                                    <div className="border-t pt-3">
                                        <div className="flex items-center text-sm text-primary mb-2">
                                            <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                                            This is how your event will appear to others
                                        </div>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <div className="w-2 h-2 bg-stats-accent rounded-full mr-2"></div>
                                            Add detailed information to attract more attendees
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">Tips for Creating Great Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tips.map((tip, index) => (
                            <Card key={index} className="p-6 hover:shadow-card transition-shadow">
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                                        <tip.icon className="w-4 h-4 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-sm">{tip.title}</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">{tip.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CreateEvent;
