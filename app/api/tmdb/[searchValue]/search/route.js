import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("hshsh");
  const searchValue = (params?.query || "").trim();

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, Number(searchParams.get("page") || 1));

  const token = process.env.TMDB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { message: "Missing Environment Variables" },
      { status: 500 },
    );
  }

  if (!searchValue) {
    return NextResponse.json(
      { results: [], page, total_pages: 0 },
      { status: 200 },
    );
  }

  try {
    const q = encodeURIComponent(searchValue);

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${q}&language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.status_message || err?.message || "Request failed";

    return NextResponse.json({ message }, { status });
  }
}
