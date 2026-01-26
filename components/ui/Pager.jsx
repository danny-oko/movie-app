"use client";

import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Pager({
  page,
  totalPages,
  onPageChange,
  maxButtons = 5,
  disabled = false,
}) {
  const safeTotal = Math.max(1, Number(totalPages) || 1);
  const safePage = Math.min(safeTotal, Math.max(1, Number(page) || 1));

  const { start, end, pagesToShow, showLeftEllipsis, showRightEllipsis } =
    useMemo(() => {
      const half = Math.floor(maxButtons / 2);
      let start = Math.max(1, safePage - half);
      let end = Math.min(safeTotal, start + maxButtons - 1);
      start = Math.max(1, end - maxButtons + 1);

      const pagesToShow = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i,
      );

      return {
        start,
        end,
        pagesToShow,
        showLeftEllipsis: start > 2,
        showRightEllipsis: end < safeTotal - 1,
      };
    }, [safePage, safeTotal, maxButtons]);

  const go = (p) => {
    if (disabled) return;
    onPageChange(Math.min(safeTotal, Math.max(1, p)));
  };

  return (
    <div
      className={`pb-12 flex flex-col gap-6 ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <div className="flex items-center justify-center">
        <p className="text-sm text-zinc-600">
          Page <span className="font-semibold">{safePage}</span> / {safeTotal}
        </p>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={safePage === 1}
              onClick={(e) => {
                e.preventDefault();
                if (safePage === 1) return;
                go(safePage - 1);
              }}
            />
          </PaginationItem>

          {start > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={safePage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  go(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {showLeftEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pagesToShow.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={safePage === p}
                onClick={(e) => {
                  e.preventDefault();
                  go(p);
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          {showRightEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {end < safeTotal && (
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={safePage === safeTotal}
                onClick={(e) => {
                  e.preventDefault();
                  go(safeTotal);
                }}
              >
                {safeTotal}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={safePage === safeTotal}
              onClick={(e) => {
                e.preventDefault();
                if (safePage === safeTotal) return;
                go(safePage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
