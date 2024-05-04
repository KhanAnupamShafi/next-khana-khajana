"use client";

import React from "react";

const Error = ({ error, reset }) => {
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center'>
      <h2 className='text-center text-xl text-[#282828]'>{error?.message}</h2>
      <button
        className='py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center mt-4'
        onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default Error;
