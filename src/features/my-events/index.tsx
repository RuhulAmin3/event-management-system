import MyEventsClient from "./components/my-events-client";
import { fetchAllEvents } from "~/app/action";
import { Event } from "~/types";

export default async function MyEvents() {

  let events: Event[] = [];
  try {
    events = await fetchAllEvents([] , true);
  } catch (error) {
    console.error("Failed to load events:", error);
    events = [];
  }

  return <MyEventsClient initialEvents={events} />;
}