import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const baseUrl = " https://api.themoviedb.org/3";
    const token = "1b4ae817f5148e920231c590f56cea5c";

    if (!token || !baseUrl) {
      return NextResponse.json(
        {
          error: "Missing environment variables (TMDB_TOKEN or TMDB_BASE_URL)",
        },
        { status: 500 }
      );
    }

    const url = `${baseUrl}/movie/${id}/credits?language=en-US`;

    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const details = err?.response?.data || null;

    return NextResponse.json(
      {
        error: "TMDB request failed",
        message: err?.message || "Internal Server Error",
        details,
      },
      { status }
    );
  }
}
