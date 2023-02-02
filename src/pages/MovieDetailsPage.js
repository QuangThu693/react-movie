import React from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import "swiper/scss/navigation";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);

  if (!data) return null;
  const {
    backdrop_path,
    poster_path,
    title,
    genres,
    overview,
    runtime,
    release_date,
  } = data;

  return (
    <div className='py-5'>
      <div className='w-full h-[700px] lg:h-[450px] md:h-[350px] overflow-hidden relative'>
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt=''
          className='w-full h-full object-cover opacity-20'
        />

        <div className='absolute top-0 left-0 h-full w-full flex items-center gap-x-10 md:gap-x-3'>
          <div className=' w-[30%] h-full p-3 '>
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt=''
              className='w-full h-full object-cover rounded-xl'
            />
          </div>
          <div className='w-[70%] h-full text-white flex flex-col mt-20 lg:mt-10'>
            <h2 className='text-5xl lg:text-3xl font-bold text-primary md:text-2xl'>
              {title}
            </h2>
            <div className='flex items-center mt-5 gap-x-20 lg:mt-2'>
              <div className='flex items-center gap-x-3 md:gap-x-2'>
                <span className=''>
                  <i className='fa-solid fa-calendar-days'></i>
                </span>
                <span className='text-2xl lg:text-xl md:text-xs'>
                  {new Date(release_date).toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {new Date(release_date).getDate()},{" "}
                  {new Date(release_date).getFullYear()}
                </span>
              </div>
              <div className='flex items-center gap-x-3 md:gap-x-2'>
                <span className=''>
                  <i className='fa-solid fa-clock'></i>
                </span>
                <span className='text-2xl lg:text-xl md:text-xs'>
                  {runtime}
                </span>
              </div>
            </div>

            <div className='max-w-[800px] mt-5 lg:mt-2 md:text-xs'>
              <p>{overview}</p>
            </div>
            <div className='flex items-center gap-x-10 mt-5 lg:mt-2 md:gap-x-5'>
              {genres.length > 0 &&
                genres.map((item) => (
                  <span
                    key={item.id}
                    className='px-5 lg:px-2 lg:py-1 py-3 border border-blue-50 rounded-lg md:text-xs'>
                    {item.name}
                  </span>
                ))}
            </div>
            <MovieMeta type='credits'></MovieMeta>
            <div className=' mt-20 lg:mt-10'>
              <button className='flex items-center gap-x-2 px-4 py-2 md:px-3 md:py-2 bg-red-500 font-bold text-xl lg:text-xs lg:font-body rounded-lg'>
                <span>
                  <i className='fa-regular fa-circle-play'></i>
                </span>
                <span>Watch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <MovieMeta></MovieMeta>
      <MovieMeta type='similar'></MovieMeta>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className='py-10 lg:py-5'>
        <div className='flex items-center gap-x-5 md:gap-x-10'>
          {cast.slice(0, 4).map((item) => (
            <div
              className='cast-item w-[150px] h-[150px] lg:w-[80px] lg:h-[80px] md:w-[40px] md:h-[40px] '
              key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=''
                className='w-full h-full object-cover rounded-lg mb-3 md:mb-1'
              />
              <h3 className='text-xl text-gray-300 lg:text-xs'>{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className='py-10 page-container lg:py-5 md:py-3'>
          <div className='flex flex-col '>
            <h3 className='inline-block p-3 mb-5 text-xl font-medium bg-secondary lg:p-2 lg:mb-3 md:p-1 md:mb-2'>
              Trailer
            </h3>
            {results.slice(0, 1).map((item) => (
              <div className='' key={item.id}>
                <div key={item.id} className='w-full aspect-video'>
                  <iframe
                    width='914'
                    height='514'
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title='Youtube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    className='object-fill w-full h-full'></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className='py-10 page-container lg:py-5 md:py-3'>
          <h2 className='mb-10 lg:mb-5 md:mb-3 text-3xl md:text-xl font-medium'>
            Similar Movie
          </h2>
          <div className='movie-list'>
            <Swiper
              grabCursor={"true"}
              slidesPerView={4}
              spaceBetween={40}
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
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }

  return null;
}

export default MovieDetailsPage;
