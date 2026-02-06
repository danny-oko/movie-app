import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req, { params }) {
  try {
    if (!process.env.TMDB_TOKEN) {
      return NextResponse.json(
        { message: "Missing environment variables" },
        { status: 500 },
      );
    }

    const { id } = params;
    const page = req.nextUrl.searchParams.get("page") ?? "1";

    const { data } = await tmdbServer.get(`/movie/${id}/similar`, {
      params: { language: "en-US", page },
    });

    return NextResponse.json(data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.status_message ||
      err?.message ||
      "Internal Server Error";

    return NextResponse.json({ message }, { status });
  }
}
