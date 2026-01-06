"use client";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const Header = () => {
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "Game-Show",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "News",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Talk-Show",
    "Thriller",
    "War",
    "Western",
  ];

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
    <header className="w-full h-[60px] flex justify-around items-center">
      <h1 className="text-bg-indigo font-bold">🎥 Movie Z</h1>

      <div className="relative flex gap-2" ref={wrapperRef}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-auto gap-2 h-[36px] border border-border-gray rounded-sm px-2 flex items-center justify-between bg-white"
        >
          <span className="text-sm">{selectedGenre}</span>
          <span className={`text-xl transition ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>

        <input
          type="search"
          placeholder="⌕ Search"
          className="w-[380px] h-[36px] border border-border-gray rounded-sm p-2"
          onFocus={() => setOpen(true)}
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

      <div className="flex items-center justify-center w-[36px] h-[36px] border border-border-gray rounded-lg">
        ☾
      </div>
    </header>
  );
};

export default Header;
