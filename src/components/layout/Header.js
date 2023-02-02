import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className='header bg-black w-full '>
      <div className='page-container flex items-center py-5 mb-5 text-white md:mb-1 md:py-2'>
        <NavLink
          to='/'
          className='w-[100px] h-[100px] lg:w-[90px] lg:h-[90px] md:w-[50px] md:h-[50px]'>
          <img
            src='https://cdn-images-1.medium.com/max/1200/1*ty4NvNrGg4ReETxqU2N3Og.png'
            alt=''
            className='w-full h-full object-cover cursor-pointer'
          />
        </NavLink>
        <div className='ml-32 flex items-center gap-x-10 text-xl md:text-xs'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? "text-primary" : "")}>
            Home
          </NavLink>
          <NavLink
            to='/movies'
            className={({ isActive }) => (isActive ? "text-primary" : "")}>
            All Movie
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
