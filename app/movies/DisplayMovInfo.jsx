// // DisplayMovInfo.jsx
// "use client";
// import React from "react";

// export default function DisplayMovInfo({ movie }) {
//   const presets = [
//     "Title",
//     "Year",
//     "Rated",
//     "Released",
//     "Runtime",
//     "Genre",
//     "Director",
//     "Poster"
//   ];

//   return (
//     <div>
//       <img src={movie.Poster} alt={movie.Title} />
//       {presets.map((key) => (
//         <p key={key}>
//           {key}: {movie[key] ?? "N/A"}
//         </p>
//       ))}
//       <p>⭐ {movie.imdbRating}</p>
//     </div>
//   );
// }
