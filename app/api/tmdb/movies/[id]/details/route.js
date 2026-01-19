import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(_req, { params }) {
  try {
    const { id } = await params;
    const token = process.env.TMDB_TOKEN;
    const baseUrl = process.env.TMDB_BASE_URL;
    if (!token || !baseUrl) {
      return NextResponse.json(
        { error: "Missing environment Variables" },
        { status: 500 },
      );
    }

    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    console.log(id);

    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.status.message || err?.message || "Internal Server Error";
    return NextResponse({ status }, { message });
  }
}
