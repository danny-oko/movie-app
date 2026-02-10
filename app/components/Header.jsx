"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { ModeToggle } from "@/components/ModeToggle";
import Modal from "./Modal";
import Input from "./search/Input";

import { ChevronDown, Search, X } from "lucide-react";

const Header = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("genre");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/tmdb/genres");
        setGenres(res.data?.genres ?? []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (!open) return;

      const activeRef = mobileSearchOpen
        ? mobileRef.current
        : desktopRef.current;

      if (activeRef && !activeRef.contains(e.target)) setOpen(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, mobileSearchOpen]);

  const router = useRouter();
  const handleHome = () => router.push("/");

  const openMobileSearch = () => {
    setOpen(false);
    setMobileSearchOpen(true);
  };

  const closeMobileSearch = () => {
    setOpen(false);
    setMobileSearchOpen(false);
  };

  const GenreButton = ({ compact = false }) => (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={[
        "h-9 rounded-md border border-zinc-200 bg-white",
        "inline-flex items-center justify-center gap-2 px-3",
        "text-zinc-900 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100",
        "shadow-sm",
        compact ? "min-w-[96px]" : "min-w-[110px] px-4",
      ].join(" ")}
    >
      <ChevronDown className="h-4 w-4" />
      <span className="whitespace-nowrap leading-none text-[14px]">
        {selectedGenre}
      </span>
    </button>
  );

  return (
    <>
      <header className="w-full border-b border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800">
        <div className="mx-auto grid h-14 min-h-14 w-full md:w-[80vw] max-w-none grid-cols-[auto_1fr_auto] items-center gap-2 px-4 sm:px-6 md:px-8 lg:px-10">
          <h1
            onClick={handleHome}
            className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 cursor-pointer shrink-0 sm:text-lg"
          >
            🎥 Movie Z
          </h1>

          <div
            ref={desktopRef}
            className="relative hidden md:flex justify-center"
          >
            <div className="flex items-center gap-2">
              <GenreButton />

              <div className="w-[380px] min-w-0">
                <Suspense
                  fallback={
                    <div
                      className="h-9 w-full min-w-0 rounded-lg border border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                      aria-hidden
                    />
                  }
                >
                  <Input showCount />
                </Suspense>
              </div>

              {open && (
                <Modal
                  genres={genres}
                  onSelect={(item) => {
                    setSelectedGenre(item);
                    setOpen(false);
                    router.push(`/genres/${item.id}?page=1`);
                  }}
                />
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={openMobileSearch}
              className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>

            <ModeToggle />
          </div>
        </div>
      </header>

      {mobileSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 md:hidden"
          onMouseDown={closeMobileSearch}
        >
          <div
            className="absolute top-0 left-0 right-0 border-b border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div ref={mobileRef} className="relative w-full px-4 py-3">
              <div className="mx-auto flex w-full max-w-3xl items-center gap-2">
                <div className="flex flex-1 justify-center">
                  <div className="flex w-full max-w-[560px] items-center gap-2">
                    <GenreButton compact />

                    <div className="flex-1 min-w-0">
                      <Input showCount={false} />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeMobileSearch}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {open && (
                <Modal
                  genres={genres}
                  onSelect={(item) => {
                    setSelectedGenre(item);
                    setOpen(false);
                    closeMobileSearch();
                    router.push(`/genres/${item.id}?page=1`);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
