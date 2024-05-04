import React from "react";

export const metadata = {
  title: "Page Not Found",
  description: "Page not found that requested by user.",
};

const NotFound = () => {
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
      <h2 className='text-center text-xl text-[#eb4a36]'>
        Opps! The page that you are requested not found.
      </h2>
    </div>
  );
};

export default NotFound;
