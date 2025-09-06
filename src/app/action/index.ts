"use server";

import { Event } from "~/types";
import { cookies } from "next/headers";

const USER_KEY = "eventhub_user";

export const getCurrentUser = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  let user = cookieStore.get(USER_KEY)?.value;

  return user;
};

// Helper to get base API URL
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // Browser: use relative path (same origin)
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  return "http://localhost:4000/api"; // Fallback
};

export async function fetchAllEvents(
  query: { name: string; value: string }[] = [],
  myEvent: boolean = false
): Promise<Event[]> {
  const baseUrl = getBaseUrl();
  const path = "/events";

  if (myEvent) {
    const user = await getCurrentUser();
    if (user) {
      query.push({ name: "createdBy", value: user });
    }
  }

  const queryString = query
    .map((q) => `${encodeURIComponent(q.name)}=${encodeURIComponent(q.value)}`)
    .join("&");

  const url = `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: {
      tags: ["events"],
    },
    cache: "no-store", // or 'force-cache' depending on your needs
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return await response.json();
}

export async function getSingleEvent(id: string): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${id}`;

  const response = await fetch(url, {
    next: {
      tags: ["events"],
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event: ${response.statusText}`);
  }

  return await response.json();
}

export async function createEvent(
  event: Omit<Event, "createdBy">
): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events`;
  let user = await getCurrentUser();
  if (!user) {
    user = `user_${Date.now()}`;
    const cookieStore = await cookies();
    cookieStore.set(USER_KEY, user);
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...event, createdBy: user }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create event");
  }

  return await response.json();
}

export async function updateEvent({
  id,
  event,
}: {
  id: string;
  event: Partial<Event>;
}): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update event");
  }

  return await response.json();
}

export async function handleRsvpToggle(
  eventId: string,
  userId: string
): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${eventId}/rsvp`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to RSVP");
  }

  const data = await response.json();
  return data.event;
}

export async function deleteEvent(id: string): Promise<boolean> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete event");
  }

  await response.json(); // or just .text() if no JSON returned
  return true; // success
}
