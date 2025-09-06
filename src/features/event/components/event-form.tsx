"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import EventFormFields from "./event-form-fields";
import EventPreview from "./event-preview";
import EventTips from "./event-tips";
import { toast } from "sonner";
import { EventFormValues, validationSchema } from "../schema";
import { Event } from "~/types";
import { getCategoryColor } from "~/lib/utils";
import { createEvent, updateEvent } from "~/app/action";

const EventForm = ({ id, defaultValues }: { id?: string; defaultValues?: EventFormValues }) => {
  const router = useRouter();

  // Initialize react-hook-form
  const methods = useForm<EventFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      date: new Date().toDateString(),
      time: "10:30:00",
      location: "",
      category: "",
      image: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    try {
      const eventId = id || `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const event: Omit<Event, "createdBy"> = {
        id: eventId,
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        time: data.time,
        location: data.location,
        image: data.image,
        categoryColor: getCategoryColor(data.category),
        rsvps: [],
        createdAt: new Date().toISOString()
      };

      if (id) {
        await updateEvent({ id, event })
      } else {
        await createEvent(event);
      }

      toast.success(id ? "Event updated successfully" : "Event created successfully", {
        position: "bottom-right",
        duration: 3000,
      })

      router.push("/my-events");
    } catch (err) {
      console.log(err);
      toast.error("Failed to save event. Try again.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left: Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <EventFormFields />

          <div className="flex gap-4 pt-6">
            <Button variant="outline" type="button" disabled={isSubmitting}>
              Save as Draft
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {id ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="lg:col-span-1">
          <EventPreview />
        </div>
      </form>

      {/* Tips */}
      <div className="mt-16">
        <EventTips />
      </div>
    </FormProvider>
  );
};

export default EventForm;
