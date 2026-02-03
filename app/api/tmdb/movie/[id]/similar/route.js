import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req, { params }) {
  const { id } = params;

  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing environment variables" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));
  const language = searchParams.get("language") || "en-US";

  try {
    const { data } = await tmdbServer.get(`/movie/${id}/similar`, {
      params: { language, page },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.status_message ||
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch similar movies";

    return NextResponse.json({ message }, { status });
  }
}
