import React from "react";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { fetcher, tmdbAPI } from "../../config";
import useSWR from "swr";
import PropsTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import { Navigation } from "swiper";
import "swiper/scss/navigation";

// https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>
//  https://api.themoviedb.org/3/movie/550?api_key=71bdd7c1c1fd830cb39566c04aa806cd

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];

  return (
    <div className='movie-list'>
      {isLoading && (
        <Swiper
          grabCursor={"true"}
          slidesPerView={4}
          spaceBetween={10}
          slidesPerGroup={1}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 3,
            },
            1023: {
              slidesPerView: 4,
            },
          }}
          style={{
            "--swiper-navigation-size": "20px",
            "--swiper-navigation-color": "#fff",
          }}
          loop={false}
          navigation={true}
          modules={[Navigation]}>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
          <SwiperSlide>
            <MovieCardSkeleton></MovieCardSkeleton>
          </SwiperSlide>
        </Swiper>
      )}

      {!isLoading && (
        <Swiper
          grabCursor={"true"}
          // slidesPerView={4}
          spaceBetween={40}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 3,
            },
            1023: {
              slidesPerView: 4,
            },
          }}
          slidesPerGroup={1}
          style={{
            "--swiper-navigation-size": "20px",
            "--swiper-navigation-color": "#fff",
          }}
          loop={false}
          navigation={true}
          modules={[Navigation]}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propsTypes = {
  type: PropsTypes.string.isRequired,
};

function FallbackComponent() {
  return (
    <p className='text-red-500 bg-red-50'>
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
