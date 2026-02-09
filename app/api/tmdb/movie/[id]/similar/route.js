import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!process.env.TMDB_TOKEN) {
      return NextResponse.json(
        { message: "Missing Environment Variables" },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const language = searchParams.get("language") || "en-US";

    const { data } = await tmdbServer.get(`/movie/${id}/similar`, {
      params: { language, page },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.status_message ?? err?.message ?? "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
