import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(_req) {
  try {
    // const { id } = params;
    const token = process.env.TMDB_TOKEN;
    const baseUrl = process.env.TMDB_BASE_URL;
    if (!token || !baseUrl) {
      return NextResponse.json(
        { error: "Missing environment Variables" },
        { status: 500 },
      );
    }

    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(res.data);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.status.message || err?.message || "Internal Server Error";
    return NextResponse({ status }, { message });
  }
}
