import * as z from "zod";

// Validation Schema
export const validationSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  description: z.string().min(1, "Event description is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  location: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  image: z.url("Please provide a valid image URL"),
});

//  Form type
export type EventFormValues = z.infer<typeof validationSchema>;