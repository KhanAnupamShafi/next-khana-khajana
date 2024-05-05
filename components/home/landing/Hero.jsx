import Image from "next/image";

const Hero = () => {
  return (
    <div className='relative py-4 bg-white rounded-lg p-4 md:p-12 min-h-[450px] grid place-items-center grid-cols-12'>
      <div className='col-span-12 md:col-span-6 relative z-10'>
        <h1 className='font-bold text-3xl md:text-5xl text-white'>
          Choose from
          <br /> thousands of recipes
        </h1>
        <p className='text-white my-4'>
          Appropriately integrate technically sound value with scalable
          infomediaries negotiate sustainable strategic theme areas
        </p>
      </div>
      <div className='absolute inset-0 z-0'>
        <div className='bg-cover-image absolute inset-0' />
        <Image
          alt='Background'
          src='/cover.png'
          layout='fill'
          objectFit='cover'
          quality={100}
          priority={true}
        />
      </div>
    </div>
  );
};

export default Hero;
