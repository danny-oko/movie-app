import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get("query") || "").trim();
    const page = Number(searchParams.get("page") || 1);

    if (!query) {
      return NextResponse.json(
        { results: [], total_pages: 1 },
        { status: 200 },
      );
    }

    const { data } = await tmdbServer.get("/search/movie", {
      params: { query, language: "en-US", page },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.status_message || err?.message || "Server error";

    return NextResponse.json({ message }, { status });
  }
}
