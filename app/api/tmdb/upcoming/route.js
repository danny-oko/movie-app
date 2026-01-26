import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = process.env.TMDB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { message: "Missing Environment variables" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const pageRaw = searchParams.get("page") || "1";
  const page = Math.max(1, Number(pageRaw) || 1);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

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
