import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { search } = req.nextUrl;

  try {
    // Check if JSON_SERVER_URL is available
    if (!process.env.JSON_SERVER_URL) {
      console.warn("JSON_SERVER_URL not configured, returning empty events array");
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Fetch data from external/backend source
    const res = await fetch(`${process.env.JSON_SERVER_URL}${search}`, {
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
    console.log("err", err);
    // Return empty array instead of error during build to prevent build failure
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        "Content-Type": "application/json", 
      },
    });
  }
}

export async function POST(req: Request) {
  try {
    // Check if JSON_SERVER_URL is available
    if (!process.env.JSON_SERVER_URL) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503 }
      );
    }

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
    const response = await fetch(String(process.env.JSON_SERVER_URL), {
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
