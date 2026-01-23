"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const Header = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await axios.get("/api/tmdb/genres");
        setGenres(res.data?.genres ?? []);
        // console.log(res.data?.genres);
      } catch (err) {
        console.log(err);
      }
    };
    getGenres();
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("genre");
  const wrapperRef = useRef(null);

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

  return (
    <header className="w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-[60px] w-full items-center justify-between px-32">
        <h1 className="text-lg font-extrabold text-zinc-900">🎥 Movie Z</h1>

        <div className="relative flex items-center gap-2" ref={wrapperRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="h-9 min-w-[120px] select-none rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-800 flex items-center justify-between gap-2"
          >
            <span className="truncate">{selectedGenre}</span>
            <span
              className={`text-base transition ${open ? "rotate-180" : ""}`}
            >
              ▾
            </span>
          </button>

          <input
            type="search"
            placeholder="⌕ Search"
            className="h-9 w-[260px] sm:w-[340px] md:w-[380px] rounded-lg border border-zinc-200 bg-white px-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none"
          />

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

        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700">
          ☾
        </div>
      </div>
    </header>
  );
};

export default Header;
