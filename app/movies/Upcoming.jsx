import React from "react";

const Upcoming = () => {
  return (
    <div className="w-full h-auto p-8 flex flex-col items-center justify-center gap-4">
      <section className="title w-3/4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Upcoming</h3>
        <button className="bg-none p-2 gap-2 w-[120px] h-[36px] flex items-center justify-center cursor-pointer">
          <p>See More</p>
          <p>→</p>
        </button>
      </section>
      <section className="wrapper w-3/4 h-5/6 ">
        <div className="movies-wrapper mt-4 w-full flex flex-wrap justify-between">
          {/* movie */}
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
          <aside className="movie-item w-[240px] h-[440px] flex flex-col items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/536/354"
              alt="lorem image"
              className="w-full h-[340px] object-cover"
            />
            <div className="movie-info w-full h-[95px] flex flex-col justify-center items-start bg-bg-gray">
              <p className="ml-4">6.9 / 10 </p>
              <h2 className="ml-4">The Movie Title</h2>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Upcoming;
