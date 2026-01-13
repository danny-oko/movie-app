///movie/${id}/credits?language=en-US
import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const token = process.env.TMDB_TOKEN;

    if (!token) {
      return NextResponse(
        {
          error: "Missing TBMD Token in environment variable",
        },
        { status: 500 }
      );
    }

    const url = `${TMBD_BASE_URL}/movie/${id}/credits?language=en-US`;

    const res = await axios.get(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "TMDB request failed", status: res.status, details: text },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.error_message ||
      err?.message ||
      "Internal server error";
    return NextResponse({ status }, { message });
  }
}
