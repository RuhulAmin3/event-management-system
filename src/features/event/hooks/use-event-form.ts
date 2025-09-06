"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createEvent, updateEvent } from "~/app/action";
import { EventFormValues, validationSchema } from "../schema";
import { buildEventObject } from "../lib/event-helper";

export const useEventForm = (id?: string, defaultValues?: EventFormValues) => {
  const router = useRouter();

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

  const onSubmit: SubmitHandler<EventFormValues> = async (data) => {
    try {
      const event = buildEventObject(data, id);

      if (id) {
        await updateEvent({ id, event });
      } else {
        await createEvent(event);
      }

      toast.success(id ? "Event updated successfully" : "Event created successfully", {
        position: "bottom-right",
        duration: 3000,
      });

      router.push("/my-events");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save event. Try again.");
    }
  };

  return { methods, onSubmit };
};