import { NextResponse } from "next/server";
import axios from "axios";
import { tmdbServer } from "../../../../lib/tmdb/tmdbServer";

export async function GET(req) {
  if (!process.env.TMDB_TOKEN) {
    return NextResponse.json(
      { message: "Missing environment variables" },
      { status: 500 },
    );
  }
  try {
    const { data } = await tmdbServer.get(`/genre/movie/list`);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const status = err?.data?.status || 500;
    const message = err?.data?.err_message || err_message || 500;
    return NextResponse.json({ status }, { message });
  }
}
