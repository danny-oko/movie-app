"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { ModeToggle } from "@/components/ModeToggle";
import Modal from "./Modal";
import Input from "./search/Input";

import { ChevronDown } from "lucide-react";

const Header = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("genre");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await axios.get("/api/tmdb/genres");
        setGenres(res.data?.genres ?? []);
      } catch (err) {
        console.log(err);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    const onDown = (e) => {
      if (!open) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target))
        setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const router = useRouter();
  const handleHome = () => router.push("/");

  return (
    <header className="w-full border-b border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800">
      <div className="mx-auto flex h-14 min-h-14 w-full w-[80%] flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 sm:gap-3 md:px-8 lg:px-12 xl:px-32">
        <h1
          onClick={handleHome}
          className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 cursor-pointer shrink-0 sm:text-lg"
        >
          🎥 Movie Z
        </h1>

        <div
          className="relative gap-2 flex flex-1 min-w-0 max-w-full items-center justify-end sm:flex-initial sm:max-w-none"
          ref={wrapperRef}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="
              h-9 min-w-[110px] w-auto
              rounded-md
              border border-zinc-200 bg-white
              px-4
              inline-flex items-center justify-center gap-2
              text-zinc-900
              dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100
              shadow-sm
            "
          >
            <ChevronDown className="h-4 w-4" />
            <span className="whitespace-nowrap leading-none text-[14px]">
              {selectedGenre}
            </span>
          </button>

          <div className="w-full min-w-0 max-w-[180px] sm:max-w-[260px] md:max-w-[340px] lg:max-w-[380px]">
            <Suspense
              fallback={
                <div
                  className="h-9 w-full min-w-0 rounded-lg border border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800"
                  aria-hidden
                />
              }
            >
              <Input />
            </Suspense>
          </div>

          {open && (
            <Modal
              genres={genres}
              onSelect={(item) => {
                setSelectedGenre(item);
                setOpen(false);
              }}
            />
          )}
        </div>

        <div className="shrink-0">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
