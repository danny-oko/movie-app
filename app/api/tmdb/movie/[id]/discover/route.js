import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const genreId = (searchParams.get("genreId") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const language = searchParams.get("language") || "en-US";

  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing Environment Variables" },
      { status: 500 },
    );
  }

  if (!genreId) {
    return NextResponse.json(
      { results: [], page, total_pages: 0 },
      { status: 200 },
    );
  }

  try {
    const { data } = await tmdbServer.get("/discover/movie", {
      params: {
        language,
        with_genres: genreId,
        page,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message:
          err?.response?.data?.status_message ||
          err?.response?.data?.message ||
          err?.message ||
          "Discover failed",
      },
      { status: err?.response?.status || 500 },
    );
  }
}
