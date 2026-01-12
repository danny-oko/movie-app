import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );
    return NextResponse.json(data);
  } catch (err) {
    const status = err?.response?.message || err.message || 500;
    const message =
      err?.response?.data?.error_message ||
      err?.message ||
      "Internal Server Error";
    return NextResponse({ status }, { message });
  }
}
