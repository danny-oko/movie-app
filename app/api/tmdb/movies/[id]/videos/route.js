// app/api/tmdb/movie/[id]/videos/route.js
import { NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const token = process.env.TMDB_V4_TOKEN; // <- store your v4 token here

    if (!token) {
      return NextResponse.json(
        { error: "Missing TMDB_V4_TOKEN in environment variables" },
        { status: 500 }
      );
    }

    const url = `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "TMDB request failed", status: res.status, details: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch TMDB videos" },
      { status: 500 }
    );
  }
}
