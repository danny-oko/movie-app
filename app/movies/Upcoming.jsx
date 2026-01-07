import React from "react";

const Upcoming = () => {
  return (
    <div className="w-full h-auto px-4 sm:px-8 py-8 flex flex-col items-center gap-4">
      <section className="w-full max-w-6xl flex items-center justify-between">
        <h3 className="text-xl font-semibold">Upcoming</h3>

        <button className="p-2 gap-2 h-9 flex items-center justify-center cursor-pointer hover:opacity-80">
          <p>See More</p>
          <p>→</p>
        </button>
      </section>

      <section className="w-full max-w-6xl">
        <div className="mt-4 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {/* movie */}
          {[...Array(8)].map((_, i) => (
            <aside
              key={i}
              className="w-full overflow-hidden rounded-2xl bg-bg-gray flex flex-col"
            >
              <img
                src="https://picsum.photos/536/354"
                alt="lorem image"
                className="w-full aspect-[2/3] object-cover"
              />

              <div className="p-4">
                <p>6.9 / 10</p>
                <h2 className="font-semibold leading-snug">The Movie Title</h2>
              </div>
            </aside>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Upcoming;
