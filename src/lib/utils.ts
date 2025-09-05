import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Event } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchAllEvents(): Promise<Event[]> {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const events = await response.json();
  
  return events;
}

export async function getSingleEvent(id: string): Promise<Event> { 
  const response = await fetch(`http://localhost:3001/api/events/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const events: Event = await response.json();

  return events;
}
