import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(_req) {
  const token = process.env.TMDB_TOKEN;
  if (!token)
    return NextResponse.json(
      { message: "Missing Environment variables" },
      { status: 500 },
    );
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        headers: {
          Accept: "applicatio/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(res.data);
    return NextResponse.json(res.data, { status: 200 });
  } catch (err) {
    const status = err?.data?.status || 500;
    const message = err?.data?.err_message || err_message || 500;
    return NextResponse.json({ status }, { message });
  }
}
