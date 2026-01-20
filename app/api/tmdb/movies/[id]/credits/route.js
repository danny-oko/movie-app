import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(_request, { params }) {
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

    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
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
