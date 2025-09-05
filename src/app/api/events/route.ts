import {events} from "~/../db.json";

export const dynamic = 'force-static';

export async function GET() { 
  return new Response(JSON.stringify(events), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}