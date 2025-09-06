"use client";
/**
 * External Imports
 */
import { useFormContext } from "react-hook-form";
import { MapPin } from "lucide-react";

/**
 * Internal Imports
 */
import DateTimeFields from "~/components/form/date-time-field";
import TextAreaField from "~/components/form/text-area-field";
import SelectCategory from "~/components/select-category";
import SelectField from "~/components/form/select-field";
import TextField from "~/components/form/text-field";
import { EventFormValues } from "../schema";

const EventFormFields = () => {
    const {
        register,
        control,
        setValue,
        formState: { errors },
    } = useFormContext<EventFormValues>();

    return (
        <div className="space-y-6">
            <TextField
                label="Event Title *"
                placeholder="Enter event title"
                register={register("title")}
                error={!!errors.title}
            />

            <TextAreaField
                label="Event Description *"
                placeholder="Describe your event"
                register={register("description")}
                error={!!errors.description}
            />

            <DateTimeFields control={control} setValue={setValue} />

            <TextField
                label="Location *"
                placeholder="Enter venue or online link"
                register={register("location")}
                error={!!errors.location}
                icon={<MapPin className="w-4 h-4" />}
            />

            <SelectField name="category" control={control} error={!!errors.category}>
                <SelectCategory />
            </SelectField>

            <TextField
                label="Event Image URL *"
                placeholder="https://example.com/image.jpg"
                register={register("image")}
                error={!!errors.image}
            />
        </div>
    );
};

export default EventFormFields;
