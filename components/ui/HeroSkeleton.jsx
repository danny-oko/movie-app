"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function HeroSkeleton() {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden rounded-lg">
      <Skeleton className="absolute inset-0 rounded-lg" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      <div className="absolute left-32 top-1/2 z-10 w-[520px] -translate-y-1/2 max-md:left-6 max-md:w-[85%] space-y-4">
        <Skeleton className="h-4 w-28 bg-white/20" />
        <Skeleton className="h-10 w-[420px] bg-white/20 max-md:w-[260px]" />
        <Skeleton className="h-4 w-32 bg-white/20" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-full bg-white/20" />
          <Skeleton className="h-3 w-11/12 bg-white/20" />
          <Skeleton className="h-3 w-10/12 bg-white/20" />
          <Skeleton className="h-3 w-9/12 bg-white/20" />
        </div>

        <Skeleton className="h-10 w-36 rounded-md bg-white/20" />
      </div>
    </div>
  );
}

export default HeroSkeleton;
