import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "../../config";
import PropTypes, { number } from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div
      className='movie-card h-[250px] md:h-[150px] rounded-lg relative cursor-pointer'
      onClick={() => navigate(`/movie/${id}`)}>
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=''
        className='w-full h-full object-cover rounded-lg '
      />
      <div className='absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden opacity-0 transition duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-70 rounded-lg'>
        <span className='text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-10 h-10'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
            />
          </svg>
        </span>
        <div className='text-white absolute top-2 right-3 block'>
          <div className='flex items-center gap-x-1'>
            <span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                className='w-6 h-6 fill-yellow-400'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z'
                />
              </svg>
            </span>
            <span>{vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className='absolute top-2 left-2 '>
          <span className='text-xl'>
            {new Date(release_date).toLocaleString("default", {
              month: "long",
            })}{" "}
            {new Date(release_date).getDate()},{" "}
            {new Date(release_date).getFullYear()}
          </span>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 bg-black bg-opacity-50 w-full h-[60px] rounded-br-lg rounded-bl-lg'>
        <h2 className='ml-2 mb-3 text-xl font-bold text-white z-10 md:text-sm'>
          {title}
        </h2>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className='text-red-500 bg-red-50'>
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className='movie-card  rounded-lg relative bg-slate-800'>
      <LoadingSkeleton
        width='100%'
        radius='8px'
        height='250px'></LoadingSkeleton>
      <div className='absolute w-full h-[50px] bg-slate-500 bottom-0 left-0 rounded-br-lg rounded-bl-lg'></div>
      <div className='absolute w-[100px] h-[30px] bg-slate-500 top-4 left-2  rounded-full'></div>
      <div className='absolute w-[60px] h-[30px] bg-slate-500 top-4 right-2 rounded-full'></div>
    </div>
  );
};
