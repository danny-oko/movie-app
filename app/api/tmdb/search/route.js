import { tmdbServer } from "@/lib/tmdb/tmdbServer";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = (searchParams.get("query") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing Environment Variables" },
      { status: 500 },
    );
  }

  if (!query) {
    return NextResponse.json(
      { results: [], page, total_pages: 0 },
      { status: 200 },
    );
  }

  try {
    const { data } = await tmdbServer.get("/search/movie", {
      params: { query, page, language: "en-US" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message:
          err?.response?.data?.status_message ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to search",
      },
      { status: err?.response?.status || 500 },
    );
  }
}
