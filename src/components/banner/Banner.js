import React, { useState } from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import { apiKey, fetcher, tmdbAPI, tmdbEndpoint } from "../../config";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { Autoplay } from "swiper";

const Banner = () => {
  const { data } = useSWR(
    `${tmdbEndpoint}/upcoming?api_key=${apiKey}`,
    fetcher
  );

  const movies = data?.results || [];

  return (
    <section className='h-[500px] lg:h-[400px] md:h-[200px] mb-20 xl:mb-8 lg:mb-5 md:mb-2 overflow-hidden banner page-container'>
      <Swiper modules={[Autoplay]} autoplay={{ delay: 5000 }}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path, vote_average, release_date, id } = item;
  const navigate = useNavigate();

  return (
    <div className='relative w-full h-full rounded-lg '>
      <div className='overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to[rgba(0,0,0,0.5)] rounded-lg'></div>
      <img
        src={tmdbAPI.imageOriginal(poster_path)}
        alt=''
        className='object-cover w-full h-full rounded-lg'
      />
      <div className='absolute w-full text-white left-5 bottom-16 lg:bottom-10 md:bottom-3'>
        <h2 className='mb-5 text-5xl font-bold lg:text-4xl md:text-2xl md:mb-2'>
          {title}
        </h2>
        <div className='flex items-center mb-12 lg:mb-5 md:mb-2'>
          <div className='flex items-center gap-x-2 md:gap-x-1'>
            <span className=''>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                className='w-8 h-8 fill-yellow-400 md:text-xs md:w-5 md:h-5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                />
              </svg>
            </span>
            <span className='text-xl md:text-xs'>{vote_average}</span>
          </div>
          <div className='flex items-center ml-24 text-2xl gap-x-3 md:gap-x-1 md:text-xs'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='w-6 h-6  md:w-5 md:h-5'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z'
                />
              </svg>
            </span>
            <span className='text-xl md:text-xs'>
              {new Date(release_date).toLocaleString("default", {
                month: "long",
              })}{" "}
              {new Date(release_date).getDate()},{" "}
              {new Date(release_date).getFullYear()}
            </span>
          </div>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
}
export default Banner;
