import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MovieGrid from "../../../../components/ui/MovieGrid";

const getSimiliarMovies = async (id) => {
  try {
    const res = await fetch(
      `${process.env.TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1j`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      },
    );
    const data = await res.json();
    return data?.results;
  } catch (error) {
    return [];
  }
};

export default async function Page({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const moviesData = await getSimiliarMovies(id);

  // console.log(moviesData);
  return (
    <div>
      <Header />
      <div className="buttons pr-36 pl-36 w-full flex items-center justify-between mt-16">
        <h1 className="text-2xl font-bold">Similiar</h1>
        <a href="/">Return to home page</a>
      </div>
      <div className="grid-holder pl-36 pr-36 pb-36 mt-12">
        <MovieGrid movies={moviesData} />
      </div>
      <Footer />
    </div>
  );
}
