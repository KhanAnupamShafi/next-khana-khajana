import Image from "next/image";
import Link from "next/link";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <nav>
      <div className='container flex justify-between py-6'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Learn-With-Sumit-Logo'
            className='w-[115] h-[40px]'
            width={115}
            height={40}
          />
        </Link>
        <NavbarMenu />
      </div>
    </nav>
  );
};

export default Navbar;
