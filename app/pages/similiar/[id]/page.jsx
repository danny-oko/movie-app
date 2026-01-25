import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import MovieGrid from "../../../../components/ui/MovieGrid";

// pagination
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pb-20 pt-12">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-zinc-900">Similiar</h1>
            <a
              href="/"
              className="text-sm text-zinc-700 text-md cursor-pointer"
            >
              Return to home page
            </a>
          </div>

          <div className="mt-5">
            <MovieGrid movies={moviesData} />
          </div>
        </div>
      </main>

      {/* pagination section */}
      {/* <section className="pagination w-full flex justify-end items-center pb-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="${process.env.TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1j" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section> */}

      <Footer />
    </div>
  );
}
