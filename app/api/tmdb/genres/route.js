import { NextResponse } from "next/server";
import { tmdbServer } from "../../../../lib/tmdb/tmdbServer";

export async function GET(req) {
  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing environment variables" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "en-US";

  try {
    const { data } = await tmdbServer.get("/genre/movie/list", {
      params: { language },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.status_message ||
      err?.response?.data?.message ||
      err?.message ||
      "Failed to fetch genres";

    return NextResponse.json({ message }, { status });
  }
}
