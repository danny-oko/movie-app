import { Suspense } from "react";
import PopularClient from "./PopularClient";

function PopularFallback() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="mx-auto w-[80vw] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="h-6 w-40 rounded-md bg-muted" />
        <div className="mt-5 h-[520px] rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PopularFallback />}>
      <PopularClient />
    </Suspense>
  );
}
