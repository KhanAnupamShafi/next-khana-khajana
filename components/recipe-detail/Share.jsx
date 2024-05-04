"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FacebookShare, LinkedinShare, TwitterShare } from "react-share-kit";

const Share = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  const socialShareButtons = [
    { Button: FacebookShare, text: "Facebook" },
    { Button: TwitterShare, text: "Twitter" },
    { Button: LinkedinShare, text: "LinkedIn" },
  ];
  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6]'
        onClick={toggleDropdown}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
          <path d='M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
          <path d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
          <path d='M8.7 10.7l6.6 -3.4' />
          <path d='M8.7 13.3l6.6 3.4' />
        </svg>
        <span>Share</span>
      </button>
      {isDropdownOpen && (
        <div className='absolute right-0 mt-2  bg-white rounded-lg shadow-lg z-10'>
          <div className='py-1'>
            {socialShareButtons.map((button, index) => {
              const Button = button.Button;
              return (
                <div
                  key={index}
                  className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100'>
                  <Button
                    url={`${window.location.origin}/${pathname}`}
                    quote={button.text}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
