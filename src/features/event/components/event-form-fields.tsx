"use client";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Tag, MapPin } from "lucide-react";

import SelectCategory from "~/components/select-category";
import DatePicker from "~/components/ui/date-picker";
import TimePicker from "~/components/ui/time-picker";
import { EventFormValues } from "../schema";

const EventFormFields = () => {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<EventFormValues>();

    console.log("err", errors);

    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <Label>Event Title *</Label>
                <Input
                    placeholder="Enter event title"
                    {...register("title")}
                    className={
                        errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
                    }
                />
            </div>

            {/* Description */}
            <div>
                <Label>Event Description *</Label>
                <Textarea
                    placeholder="Describe your event"
                    {...register("description")}
                    className={
                        errors.description
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                    }
                />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
                <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                        <DatePicker 
                            value={field.value}
                            onChange={(date) => setValue("date", date)}
                        />
                    )}
                />
                <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                        <TimePicker 
                            value={field.value}
                            onChange={(time) => setValue("time", time)}
                        />
                    )}
                />
            </div>
            {/* Location */}
            <div>
                <Label>Location *</Label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Enter venue or online link"
                        className={`pl-10 ${errors.location ? "border-red-500 focus-visible:ring-red-500" : ""
                            }`}
                        {...register("location")}
                    />
                </div>
            </div>

            {/* Category */}
            <div>
                <Label>Category *</Label>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                                className={
                                    errors.category
                                        ? "border-red-500 focus-visible:ring-red-500"
                                        : ""
                                }
                            >
                                <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                                <SelectValue placeholder="Select event category" />
                            </SelectTrigger>
                            <SelectCategory />
                        </Select>
                    )}
                />
            </div>

            {/* Image URL */}
            <div>
                <Label>Event Image URL *</Label>
                <Input
                    className={
                        errors.image ? "border-red-500 focus-visible:ring-red-500" : ""
                    }
                    placeholder="https://example.com/image.jpg"
                    {...register("image")}
                />
            </div>
        </div>
    );
};

export default EventFormFields;
