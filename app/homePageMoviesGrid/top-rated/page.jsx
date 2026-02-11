// app/homePageMoviesGrid/top-rated/page.jsx  (SERVER)
import { Suspense } from "react";
import TopRatedClient from "./TopRatedClient";

function TopRatedFallback() {
  return (
    <div className="mx-auto w-[80%] max-w-none px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
      <div className="h-6 w-40 rounded-md bg-muted" />
      <div className="mt-5 h-64 rounded-lg bg-muted" />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<TopRatedFallback />}>
      <TopRatedClient />
    </Suspense>
  );
}
