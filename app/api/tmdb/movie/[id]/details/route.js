import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req) {
  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing Environment Variables" },
      { status: 500 },
    );
  }

  try {
    const { data } = await tmdbServer.get(`/movie/${movieId}`, {
      params: { language: "en-Us" },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message:
          err?.response?.data?.status_message ||
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch now playing",
      },
      { status: err?.response?.status || 500 },
    );
  }
}
