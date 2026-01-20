// /movie/${id}/videos?language=en-US
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(_req, { params }) {
  try {
    const { id } = params;

    const baseUrl = process.env.TMDB_BASE_URL;
    const token = process.env.TMDB_TOKEN;

    if (!token || !baseUrl) {
      return NextResponse.json(
        { message: "missing environment variables" },
        { status: 500 },
      );
    }

    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return NextResponse.json(
      res.data,
      { message: "acceptped res data" },
      { status: 200 },
    );
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response.status_message ?? err?.message ?? "Internal Server error";
    return NextResponse.json({ status }, { message });
  }
}
