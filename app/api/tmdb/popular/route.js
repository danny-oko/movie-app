import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );
    return NextResponse.json(data);
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.error_message || err?.message || "Server Error";
    return NextResponse({ message }, { status });
  }
}
