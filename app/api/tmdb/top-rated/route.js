import { NextResponse } from "next/server";
import { tmdbServer } from "@/lib/tmdb/tmdbServer";

export async function GET(req) {
  
  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing environment variables" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const pageRaw = searchParams.get("page") || "1";
  const page = Math.max(1, Number(pageRaw) || 1);
  const language = searchParams.get("language") || "en-Us";

  try {
    const { data } = await tmdbServer.get(`/movie/top_rated`, {
      params: { page, language },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message = err?.response?.status_message || "Internal Server Error!";

    return NextResponse.json({ status }, { message });
  }
}
