import { NextResponse } from "next/server";
import axios from "axios";
import { tmdbServer } from "../../../../../../lib/tmdb/tmdbServer";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;

    if (!process.env.TMDB_TOKEN) {
      return NextResponse.json(
        { message: "Missing Environment Variables" },
        { status: 500 },
      );
    }

    const { data } = await tmdbServer.get(`/movie/${id}/videos`, {
      params: { language: "en-Us" },
    });
    return NextResponse.json(data, { status: 200 }); 
  } catch (err) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.status_message ?? err?.message ?? "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
