import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchAllEvents(
  query: { name: string; value: string }[] = []
): Promise<Event[]> {
  const queryString = query
    .map((q) => `${encodeURIComponent(q.name)}=${encodeURIComponent(q.value)}`)
    .join("&");

  // Build final URL
  const url = `http://localhost:4000/api/events${
    queryString ? `?${queryString}` : ""
  }`;
  const response = await fetch(url, {
    next: {
      tags: ["events"],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  const events: Event[] = await response.json();
  return events;
}

export async function getSingleEvent(id: string): Promise<Event> {
  const response = await fetch(`http://localhost:4000/api/events/${id}`, {
    next: {
      tags: ["events"],
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const events: Event = await response.json();

  return events;
}

export async function createEvent(event: Event): Promise<Event> {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  const newEvent: Event = await response.json();
  return newEvent;
}

export async function updateEvent({
  id,
  event,
}: {
  id: string;
  event: Partial<Event>;
}): Promise<Event> {
  const response = await fetch(`/api/events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    throw new Error("Failed to create event");
  }

  const newEvent: Event = await response.json();
  return newEvent;
}

export async function handleRsvpToggle(
  eventId: string,
  userId: string
): Promise<Event> {
  const res = await fetch(`/api/events/${eventId}/rsvp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  const data = await res.json();

  return data.event;
}

export async function deleteEvent(id: string) {
  const response = await fetch(`http://localhost:4000/api/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete events");
  }
  const events = await response.json();

  return events;
}

// utils
export const getCategoryColor = (category: string) => {
  const colorMap: { [key: string]: string } = {
    conference: "bg-blue-100 text-blue-800",
    workshop: "bg-green-100 text-green-800",
    networking: "bg-purple-100 text-purple-800",
    social: "bg-pink-100 text-pink-800",
    sports: "bg-orange-100 text-orange-800",
    arts: "bg-red-100 text-red-800",
    food: "bg-yellow-100 text-yellow-800",
    music: "bg-indigo-100 text-indigo-800",
    tech: "bg-blue-100 text-blue-800",
    business: "bg-gray-100 text-gray-800",
  };
  return colorMap[category] || "bg-gray-100 text-gray-800";
};

export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
