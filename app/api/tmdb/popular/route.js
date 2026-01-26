import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const token = process.env.TMDB_TOKEN;
  if (!token) {
    return NextResponse.json("Error: Missing Environment Variables", {
      status: 500,
    });
  }
  const { searchParams } = new URL(req.url);
  const pageRaw = searchParams.get("page") || "1";
  const page = Math.max(1, Number(pageRaw) || 1);

  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = err?.response?.status || 500;
    const message = err?.response?.status_message || "Internal Server Error!";

    return NextResponse.json({ status }, { message });
  }
}