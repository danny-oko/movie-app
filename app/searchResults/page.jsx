import { Suspense } from "react";
import SearchResultsClient from "./SearchResultsClient";

function SearchFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="mx-auto w-[80vw] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="h-6 w-72 rounded-md bg-muted" />
        <div className="mt-6 h-[520px] rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResultsClient />
    </Suspense>
  );
}
