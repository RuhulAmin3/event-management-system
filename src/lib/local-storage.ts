"use client";
import { Event } from "~/types";

const EVENTS_KEY = 'eventhub_events';
const USER_KEY = 'eventhub_user';

// User management
export const getCurrentUser = (): string => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) {
    const userId = `user_${Date.now()}`;
    localStorage.setItem(USER_KEY, userId);
    return userId;
  }
  return user;
};

// Event management
export const getAllEvents = (): Event[] => {
  const events = localStorage.getItem(EVENTS_KEY);
  return events ? JSON.parse(events) : [];
};

export const getEventById = (id: string): Event | null => {
  const events = getAllEvents();
  return events.find(event => event.id === id) || null;
};

export const getMyEvents = (): Event[] => {
  const events = getAllEvents();
  const currentUser = getCurrentUser();
  return events.filter(event => event.createdBy === currentUser);
};

export const saveEvent = (event: Event): void => {
  const events = getAllEvents();
  
  const existingIndex = events.findIndex(e => e.id === event.id);
  
  if (existingIndex >= 0) {
    events[existingIndex] = event;
  } else {
    events.push(event);
  }
  
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const deleteEvent = (id: string): void => {
  const events = getAllEvents();
  const filteredEvents = events.filter(event => event.id !== id);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(filteredEvents));
};

export const rsvpToEvent = (eventId: string): void => {
  const events = getAllEvents();
  const currentUser = getCurrentUser();
  const event = events.find(e => e.id === eventId);
  
  if (event) {
    if (!event.rsvps.includes(currentUser)) {
      event.rsvps.push(currentUser);
      localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
    }
  }
};

export const unRsvpFromEvent = (eventId: string): void => {
  const events = getAllEvents();
  const currentUser = getCurrentUser();
  const event = events.find(e => e.id === eventId);
  
  if (event) {
    event.rsvps = event.rsvps.filter(userId => userId !== currentUser);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  }
};

export const isUserRsvped = (eventId: string): boolean => {
  const event = getEventById(eventId);
  const currentUser = getCurrentUser();
  return event ? event.rsvps.includes(currentUser) : false;
};