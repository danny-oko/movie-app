import axios from "axios";
import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET() {
  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing Environment variables" },
      { status: 500 },
    );
  }
  try {
    const { data } = await tmdbServer.get(`/movie/now_playing`, {
      params: { language: "en-Us" },
    });
    return NextResponse.json(data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.error_message || err?.message || "Server Error";
    return NextResponse({ status }, { message });
  }
}
