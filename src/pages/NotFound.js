import Button from "components/button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='relative page-container w-full h-[500px]  my-5'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-3'>
          <h2 className='text-9xl font-bold'>404</h2>
          <span>Sorry, We couldn't find what you are looking for!</span>
          <Button bgColor='secondary' onClick={() => navigate("/")}>
            Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
