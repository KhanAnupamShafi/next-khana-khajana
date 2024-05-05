const Backdrop = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
      <div className='flex place-items-center'>
        <div className='relative'>
          <div className='w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200'></div>
          <div className='w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-purple-500 border-t-transparent shadow-md'></div>
        </div>
      </div>
    </div>
  );
};

export default Backdrop;
