"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

import { ModeToggle } from "@/components/ModeToggle";
import Modal from "./Modal";
import Input from "./search/Input";
import { moviesService } from "@/lib/services/movies";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ChevronDown, Search } from "lucide-react";

const Header = () => {
  const [genres, setGenres] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("genre");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await moviesService.genres();
        setGenres(data?.genres ?? []);
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
      <div className="mx-auto flex h-14 min-h-14 w-[80vw] max-w-none flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 sm:gap-3 md:px-8 lg:px-10">
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
            onClick={() => {
              setOpen((v) => !v);
            }}
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

          <div className="hidden min-w-0 sm:block sm:w-[260px] md:w-[340px] lg:w-[380px]">
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

          <Dialog open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Open search"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 sm:hidden"
              >
                <Search className="h-4 w-4" />
              </button>
            </DialogTrigger>
            <DialogContent className="top-3 left-1/2 w-[calc(100%-1rem)] max-w-none translate-x-[-50%] translate-y-0 rounded-xl p-3 sm:hidden">
              <DialogHeader className="sr-only">
                <DialogTitle>Search movies</DialogTitle>
              </DialogHeader>
              <Input showCount={false} autoFocus mobile />
            </DialogContent>
          </Dialog>

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
