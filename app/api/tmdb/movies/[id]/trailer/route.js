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

    const url = `${baseUrl}/movie/${id}/videos?language=en-US`;

    const res = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.status_message ?? err?.message ?? "Server error";

    return NextResponse.json({ error: message }, { status });
  }
}
