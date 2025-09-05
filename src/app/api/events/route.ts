import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { search } = req.nextUrl;

  try {
    // Fetch data from external/backend source
    const res = await fetch(`http://localhost:3000/events${search}`, {
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

    const events = await res.json();

    return new Response(JSON.stringify(events), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (err) {
    console.log("err", err)
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      date,
      time,
      location,
      createdBy,
      categoryColor,
    } = body;

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !location ||
      !createdBy ||
      !categoryColor
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // save to the json server
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save data to json-server");
    }

    const data = await response.json();

    return NextResponse.json(
      { message: "Event created successfully", event: data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
