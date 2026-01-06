import React from "react";

const Modal = () => {
  return (
    <div className="relative">
      {/* top controls (button + search) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          // onClick={() => setOpen((v) => !v)}
          className="h-10 min-w-[110px] rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium shadow-sm hover:bg-zinc-50 flex items-center justify-between gap-2"
        >
          {/* <span>{selected ?? "Genre"}</span> */}
          {/* <span className={`transition ${open ? "rotate-180" : ""}`}>▾</span> */}
        </button>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            ⌕
          </span>
          <input
            // value={query}
            // onFocus={() => setOpen(true)}
            // onChange={(e) => setQuery(e.target.value)}
            placeholder="Search.."
            className="h-10 w-[420px] rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm shadow-sm outline-none focus:ring-2 focus:ring-zinc-200"
          />
        </div>
      </div>

      {/* backdrop (optional, gives “modal” vibe) */}
      {/* {open && (
        <div
          className="fixed inset-0 bg-black/10"
          // onClick={() => setOpen(false)}
        />
      )} */}

      {/* panel */}
      {open && (
        <div className="absolute left-0 top-12 z-50 w-[760px] rounded-2xl border border-zinc-200 bg-white shadow-xl">
          <div className="p-6">
            <h3 className="text-3xl font-semibold text-zinc-900">Genres</h3>
            <p className="mt-1 text-sm text-zinc-600">
              See lists of movies by genre
            </p>
            <div className="my-5 h-px w-full bg-zinc-200" />

            <div className="flex flex-wrap gap-3">
              {/* {filtered.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => {
                    setSelected(g);
                    setOpen(false);
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm hover:bg-zinc-50"
                >
                  {g}
                  <span className="text-zinc-400 group-hover:text-zinc-600">
                    ›
                  </span>
                </button>
              ))} */}

              {/* {filtered.length === 0 && ( */}
              <p className="text-sm text-zinc-500">No genres found.</p>
              {/* )} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
