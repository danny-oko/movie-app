import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(_request, { params }) {
  try {
    const { id } = params;

    if (!process.env.TMDB_TOKEN) {
      return NextResponse.json({ message: "Missing environment variables" });
    } 

    const { data } = await tmdbServer.get(`movie/${id}/credits`, {
      params: { langauge: "en-Us" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const message =
      err?.response?.data?.status_message ||
      err?.message ||
      "Internal server error";

    const status = err?.response?.status || 500;

    return NextResponse.json({ message }, { status });
  }
}
