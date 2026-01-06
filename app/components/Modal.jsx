"use client";
import React from "react";

const Modal = ({ genres = [], onSelect }) => {
  return (
    <div className="absolute left-0 top-12 z-50 w-[572px] h-[332px] rounded-2xl border border-zinc-200 bg-white shadow-xl">
      <div className="p-6">
        <h3 className="text-3xl font-semibold text-zinc-900">Genres</h3>
        <p className="mt-1 text-lg text-zinc-600">
          See lists of movies by genre
        </p>

        <div className="my-5 h-px w-full bg-zinc-200" />

        <div className="flex flex-wrap gap-3 max-h-[190px] overflow-auto pr-1">
          {genres.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
