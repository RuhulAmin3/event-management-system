# Event Management System

![Event Management System](https://ik.imagekit.io/cedope9wx/assets/image.png?updatedAt=1757178496775)

> **A modern event management web application built with Next.js 15, TypeScript, and Tailwind CSS**

## 🔗 Live Demo
**[View Live Application](https://event-management-system-blush-eight.vercel.app/)**

## 📋 Project Overview

This is a full-stack event management system that allows users to:
- **Create Events** - Add new events with details, images, and categories
- **Browse Events** - View all available events in a responsive grid
- **RSVP System** - Users can RSVP to events and track attendance
- **Manage Events** - Edit, delete, and view statistics for created events

## 🛠️ Technology Stack
- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for styling with Radix UI components  
- **React Hook Form** with Zod validation
- **MockAPI** for backend data storage
- **Cookie-based** user management

## ⚡ Quick Start (For Evaluation)

### Prerequisites
- Node.js 18+ installed
- npm/yarn/pnpm package manager

### Run Locally (3 Simple Steps)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   > The default configuration will work immediately - no changes needed!

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Project Structure

```
src/
├── app/                     # Next.js App Router - main application routes
│   ├── api/                # REST API endpoints for CRUD operations  
│   ├── create-event/       # Event creation page with form
│   ├── edit-event/[id]/    # Dynamic event editing page
│   ├── events/[id]/        # Dynamic event details page
│   ├── my-events/          # User dashboard for managing events
│   └── action/             # Server actions for data fetching
├── components/             # Reusable UI components
│   └── ui/                # Shadcn/ui base components (Button, Card, etc.)
├── features/              # Feature-based modules (business logic)
│   ├── create-event/      # Event creation components and hooks
│   ├── event-details/     # Event display and RSVP components
│   ├── home/              # Homepage sections and event grid
│   └── my-events/         # Dashboard components and statistics
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── constant/              # App constants and static data
```

## 📱 Key Features

### 🏁 Event Creation
- Rich form with real-time validation
- Image URL support with preview
- Category selection with color coding
- Date and time picker integration
- Description and location fields

### 📊 Event Management Dashboard
- View all created events in grid layout
- Edit existing events (pre-populated form)
- Delete events with confirmation dialog
- Event statistics (total events, RSVPs, categories)

### 🔍 Event Discovery
- Browse all events on homepage
- Responsive grid layout
- Event cards with key information
- Click to view detailed event pages

### ❤️ RSVP System
- One-click RSVP functionality
- Real-time attendance counter
- RSVP status tracking per user
- Visual feedback for RSVP status

## 🏗️ Code Architecture & Best Practices

This project demonstrates modern React/Next.js development patterns and clean code principles:

### 🎯 Single Responsibility Principle (SRP)
- **Components** - Each component has a single, well-defined purpose
  - `EventCard` - Only displays event information
  - `EventForm` - Only handles event creation/editing
  - `RsvpSection` - Only manages RSVP functionality
- **Custom Hooks** - Separated business logic from UI components
  - `useEventForm` - Handles form state and validation logic
  - Server actions isolated in `/app/action/` directory

### 🔄 Reusability & Component Composition
- **Atomic Design** - Built with composable UI components
  - Base components in `/components/ui/` (Button, Card, Input)
  - Feature components in `/features/` for specific functionality
- **Shared Components** - Reusable across multiple pages
  - `BackButton` - Used in create, edit, and detail pages
  - `CardSkeletonGrid` - Loading states across different views
  - `EventCard` vs `MyEventCard` - Variants for different contexts

### ⚡ Server-Side Rendering (SSR) & Performance
- **Next.js App Router** - Modern SSR implementation
  - Static generation for homepage with ISR
  - Dynamic routes for event details (`/events/[id]`)
  - Server components for initial data loading
- **Selective Dynamic Rendering**
  - `/my-events` marked as `'force-dynamic'` (uses cookies)
  - Static pages cached where possible

### 🖥️ Server Components & Data Fetching
- **Server-First Approach** - Data fetched on server when possible
  ```typescript
  // Server Component - /features/home/components/event-grid.tsx
  const EventsGrid = async () => {
    const fetchedEvents = await fetchAllEvents(); // Server-side fetch
    return <EventGrid events={events} />;
  };
  ```
- **Server Actions** - Modern data mutations
  ```typescript
  // /app/action/index.ts - "use server" functions
  export async function createEvent(event: Event) { ... }
  export async function updateEvent({ id, event }) { ... }
  ```
- **Optimistic Updates** - Client-side state management for better UX
- **Error Boundaries** - Graceful error handling at component level

### 🔒 Type Safety & Validation
- **Full TypeScript** - End-to-end type safety
- **Zod Schemas** - Runtime validation with type inference
  ```typescript
  const validationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string().min(1, "Date is required")
  });
  ```
- **Form Validation** - React Hook Form with Zod integration

### 🎨 Modern UI Patterns
- **Compound Components** - Complex UI built from simple parts
- **Render Props** - Flexible component APIs
- **Custom Hooks** - Business logic separation
- **Suspense Boundaries** - Loading states with React 18 features

### 📊 State Management Strategy
- **Server State** - Managed via server actions and Next.js caching
- **Client State** - React Hook Form for forms, useState for UI state
- **Cookie-based Sessions** - Simple user management without complex auth
- **Optimistic Updates** - Immediate UI feedback for better UX

## 🚀 Guide to Test the Application

1. **Homepage** - Browse existing events
2. **Create Event** - Use the "Create Event" button to add a new event
3. **My Events** - View your created events and statistics
4. **Event Details** - Click any event to see details and RSVP
5. **Edit/Delete** - From "My Events", edit or delete your events

## 📝 Environment Configuration

The application uses MockAPI for data persistence. The `.env.example` contains:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
JSON_SERVER_URL=https://68bc09e30f2491613eddede1.mockapi.io/api/v1/events
```

> **Note:** The MockAPI endpoint is already configured and working. No additional setup required for evaluation.

## 🛡️ Build and Production

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🌐 Deployment

**Live Demo**: [https://event-management-system-blush-eight.vercel.app/](https://event-management-system-blush-eight.vercel.app/)

---

**Created by Md. Ruhul Amin** - Full Stack Developer