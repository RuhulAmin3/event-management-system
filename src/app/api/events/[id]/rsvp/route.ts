import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let userId: string;

  try {
    // Parse request body
    const body = await req.json();
    userId = body.userId;

    if (!userId) {
      return Response.json({ error: "userId is required" }, { status: 400 });
    }
  } catch (err) {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    // Step 1: Fetch current event from your backend
    const fetchRes = await fetch(`http://localhost:3000/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!fetchRes.ok) {
      return Response.json({ error: "Event not found" }, { status: 404 });
    }

    const event = await fetchRes.json();

    // Step 2: Check if user is already in rsvps
    const hasRsvped = event.rsvps?.includes(userId);

    let updatedRsvps: string[];

    if (hasRsvped) {
      // Remove user (un-RSVP)
      updatedRsvps = event.rsvps.filter((id: string) => id !== userId);
    } else {
      // Add user (RSVP)
      updatedRsvps = [...(event.rsvps || []), userId];
    }

    // Step 3: Update event with new rsvps list
    const updateRes = await fetch(`http://localhost:3000/events/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rsvps: updatedRsvps }),
    });

    if (!updateRes.ok) {
      throw new Error("Failed to update RSVP on backend");
    }

    const updatedEvent = await updateRes.json();

    // Step 4: Return updated event
    return Response.json(
      {
        message: hasRsvped ? "RSVP removed" : "RSVP added",
        event: updatedEvent,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error handling RSVP:", err);
    return Response.json({ error: "Failed to process RSVP" }, { status: 500 });
  }
}
