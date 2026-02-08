"use client";
import React from "react";
import { Separator } from "./separator";

const Credits = ({ director, writers, stars }) => {
  return (
    <div className="mt-6 sm:mt-8">
      <CreditRow
        label="Director"
        values={director.slice(0, 2).map((d) => d.name)}
      />
      <Separator />
      <CreditRow
        label="Writers"
        values={writers.slice(0, 3).map((w) => w.name)}
      />
      <Separator />
      <CreditRow label="Stars" values={stars.slice(0, 3).map((s) => s.name)} />
      <Separator />
    </div>
  );
};

export default Credits;

function CreditRow({ label, values = [] }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(120px,180px)_1fr] sm:gap-0 sm:items-center py-4 sm:py-6">
      <p className="text-sm sm:text-base font-bold text-foreground">{label}</p>
      <p className="text-sm sm:text-base text-foreground break-words">
        {values.length ? values.join(" · ") : "--"}
      </p>
    </div>
  );
}
