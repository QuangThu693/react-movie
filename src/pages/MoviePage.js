import React, { useEffect, useState } from "react";
import { fetcher, tmdbAPI } from "../config";
import MovieCard, { MovieCardSkeleton } from "components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import { v4 } from "uuid";
import useSWRInfinite from "swr/infinite";
import Button from "components/button/Button";

const itemsPerPage = 20;

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const filterDebounce = useDebounce(filter, 500);
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );

  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);

  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  const loading = !data && !error;

  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  return (
    <div className='py-10 page-container lg:py-5 md:py-3'>
      <div className='flex mb-10 lg:mb-5 md:mb-3'>
        <div className='flex-1 '>
          <input
            type='text'
            className='w-full p-4 md:p-3 text-white outline-none bg-slate-800'
            placeholder='Type here to search...'
            onChange={handleFilterChange}
          />
        </div>
      </div>
      {loading && (
        <div className='grid grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 lg:gap-5'>
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className='grid grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 lg:gap-5 '>
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className='mt-10 text-center lg:mt-5 md:mt-3'>
        <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""}`}>
          Load More
        </Button>
      </div>
    </div>
  );
};

export default MoviePage;
