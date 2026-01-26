import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const token = process.env.TMDB_TOKEN;
    const baseUrl = process.env.TMDB_BASE_URL;

    if (!token || !baseUrl) {
      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 },
      );
    }
    const { searchParams } = new URL(req.url);
    const pageRaw = searchParams.get("page") || "1";
    const page = Math.max(1, Number(pageRaw) || 1);

    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`;

    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.datakk);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const message =
      err?.response?.data?.status_message ||
      err?.message ||
      "Internal server error";

    const status = err?.response?.status || 500;

    return NextResponse.json({ message }, { status });
  }
}
