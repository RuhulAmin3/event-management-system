"use server";

import { Event } from "~/types";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

// Key used to store the user ID in cookies
const USER_KEY = "eventhub_user";

/**
 * Get the current user ID from cookies.
 * If the user does not exist, undefined is returned.
 *
 * @returns {Promise<string | undefined>} The current user ID or undefined
 */
export const getCurrentUser = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  const user = cookieStore.get(USER_KEY)?.value;
  return user;
};

/**
 * Helper function to determine the base API URL depending on environment
 *
 * @returns {string} Base URL for API requests
 */
const getBaseUrl = () => {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
};

/**
 * Fetch all events from the API.
 * Optionally filter by query parameters and fetch only the current user's events.
 *
 * @param {Array<{ name: string; value: string }>} query - Array of query parameters for filtering
 * @param {boolean} myEvent - Whether to filter events created by the current user
 * @returns {Promise<Event[]>} Array of event objects
 */
export async function fetchAllEvents(
  query: { name: string; value: string }[] = [],
  myEvent: boolean = false
): Promise<Event[]> {
  const baseUrl = getBaseUrl();
  const path = "/events";

  // If fetching only user's events, add createdBy filter
  if (myEvent) {
    const user = await getCurrentUser();
    if (user) {
      query.push({ name: "createdBy", value: user });
    }
  }

  // Build query string for URL
  const queryString = query
    .map((q) => `${encodeURIComponent(q.name)}=${encodeURIComponent(q.value)}`)
    .join("&");

  const url = `${baseUrl}${path}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { tags: ["events"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return await response.json();
}

/**
 * Fetch a single event by ID
 *
 * @param {string} id - Event ID to fetch
 * @returns {Promise<Event>} The event object
 */
export async function getSingleEvent(id: string): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${id}`;

  const response = await fetch(url, {
    next: { tags: ["events"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Create a new event
 *
 * @param {Omit<Event, "createdBy">} event - Event data excluding the creator
 * @returns {Promise<Event>} Newly created event object
 */
export async function createEvent(
  event: Omit<Event, "createdBy">
): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events`;

  // Get or create user ID
  let user = await getCurrentUser();
  if (!user) {
    user = `user_${Date.now()}`;
    const cookieStore = await cookies();
    cookieStore.set(USER_KEY, user); // Save new user ID in cookies
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...event, createdBy: user }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to create event");
  }

  return await response.json();
}

/**
 * Update an existing event
 *
 * @param {{ id: string; event: Partial<Event> }} param0 - Event ID and partial event data to update
 * @returns {Promise<Event>} Updated event object
 */
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update event");
  }

  return await response.json();
}

/**
 * Toggle RSVP for a specific event for the current user
 *
 * @param {string} eventId - Event ID to toggle RSVP
 * @returns {Promise<Event>} Updated event object
 */
export async function handleRsvpToggle(eventId: string): Promise<Event> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${eventId}/rsvp`;
  const userId = await getCurrentUser();

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Failed to RSVP");
  }

  revalidateTag("events"); // Trigger revalidation for event cache

  const data = await response.json();
  return data.event;
}

/**
 * Delete an event by ID
 *
 * @param {string} id - Event ID to delete
 * @returns {Promise<boolean>} True if deletion was successful
 */
export async function deleteEvent(id: string): Promise<boolean> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/events/${id}`;

  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete event");
  }

  revalidateTag("events"); // Trigger revalidation for event cache
  await response.json();

  return true;
}
