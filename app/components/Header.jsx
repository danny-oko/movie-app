"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Modal from "./Modal";
import { ModeToggle } from "@/components/ModeToggle"; 
import Input from "./search/Input";

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
      <div className="mx-auto flex h-[60px] w-full items-center justify-between px-32">
        <h1
          onClick={handleHome}
          className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 cursor-pointer"
        >
          🎥 Movie Z
        </h1>

        <div className="relative flex items-center gap-2" ref={wrapperRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-9 min-w-[120px] select-none rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800 flex items-center justify-between gap-2
                       dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100"
          >
            <span className="truncate">{selectedGenre}</span>
            <span
              className={`text-base transition ${open ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          <Input />

          {/* <input
            type="search"
            placeholder="🔎︎ Search"
            className="h-9 w-[260px] sm:w-[340px] md:w-[380px] rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none
                 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          /> */}

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

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
