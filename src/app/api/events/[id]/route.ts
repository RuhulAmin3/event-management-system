import { events } from "~/../db.json";

export async function GET(
  _req: Request,
  ctx: RouteContext<`/api/events/[id]`>
) {
  const { id } = await ctx.params;

  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    return new Response(JSON.stringify({ error: "Event not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(event), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
