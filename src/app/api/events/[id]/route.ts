import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(
  _req: Request,
  ctx: RouteContext<`/api/events/[id]`>
) {
  const { id } = await ctx.params;
  try {
    // Fetch data from external/backend source
    const res = await fetch(`${process.env.JSON_SERVER_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch events: ${res.status} ${res.statusText}`
      );
    }

    const event = await res.json();
    console.log("single get:", event["rsvps"]);
    return new Response(JSON.stringify(event), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("err", err);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Parse the updated fields from the request body
    const body = await req.json();

    // Forward the PATCH request to your backend
    const res = await fetch(`${process.env.JSON_SERVER_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Backend error:", errorText);
      throw new Error(
        `Failed to update event: ${res.status} ${res.statusText}`
      );
    }

    // Get the updated event from the response
    const updatedEvent = await res.json();
    // Return the updated event to the client
    return Response.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error("Error updating event:", err);
    return Response.json({ error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const deleteRes = await fetch(`${process.env.JSON_SERVER_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!deleteRes.ok) {
      return Response.json(
        { error: "Failed to delete event" },
        { status: 500 }
      );
    }
    revalidateTag("events");
    return Response.json(
      { message: "Event deleted successfully", id },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting event:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
