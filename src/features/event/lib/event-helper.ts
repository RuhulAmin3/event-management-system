import { Event } from "~/types";
import { getCategoryColor } from "~/lib/utils";

export const generateEventId = () =>
  `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

export const buildEventObject = (
  data: any,
  id?: string
): Omit<Event, "createdBy"> => ({
  id: id || generateEventId(),
  title: data.title,
  description: data.description,
  category: data.category,
  date: data.date,
  time: data.time,
  location: data.location,
  image: data.image,
  categoryColor: getCategoryColor(data.category),
  rsvps: [],
  createdAt: new Date().toISOString(),
});
