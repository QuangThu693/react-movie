import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className='pb-20 lg:pb-10 md:pb-5 movie-layout page-container'>
        <h2 className='mb-5 md:mb-2 text-3xl lg:text-2xl lg:pl-2 md:text-xl md:border-l-4 font-bold text-white capitalize border-l-8 border-primary pl-5'>
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className='pb-20 md:pb-5 movie-layout lg:pb-10 page-container'>
        <h2 className='mb-5 md:mb-2  text-3xl lg:text-2xl lg:pl-2 md:text-xl md:border-l-4 font-bold text-white capitalize border-l-8 border-primary pl-5'>
          Top rated
        </h2>
        <MovieList type='top_rated'></MovieList>
      </section>
      <section className='pb-20 md:pb-5  movie-layout lg:pb-10 page-container'>
        <h2 className='mb-5 md:mb-2  text-3xl lg:text-2xl lg:pl-2 md:text-xl md:border-l-4 font-bold text-white capitalize border-l-8 border-primary pl-5'>
          Trending
        </h2>
        <MovieList type='popular'></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
