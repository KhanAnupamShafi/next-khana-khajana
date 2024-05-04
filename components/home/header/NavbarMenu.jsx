"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NavbarMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { auth, setAuth } = useAuth();

  const logout = () => {
    setAuth(null);
    router.push("/login");
  };

  return (
    <>
      <ul className='flex gap-4 text-sm text-gray-500'>
        <li className={`py-2 ${pathname === "/" && "active"}`}>
          <Link href='/'>Home</Link>
        </li>

        <li className={`py-2 ${pathname === "/recipes" && "active"}`}>
          <Link href='/recipes'>Recipes</Link>
        </li>

        <li className={`py-2 ${pathname === "/about-us" && "active"}`}>
          <Link href='/about-us'>About us</Link>
        </li>

        {auth ? (
          <div className='flex items-center gap-2 -mt-1 '>
            <p className='mx-2 py-2'>
              Hey !, <span className='font-[800]'>{auth?.firstName}</span>
            </p>
            <button
              onClick={logout}
              className='py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center'>
              Log out
            </button>
          </div>
        ) : (
          <li className='py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center'>
            <Link href='/login'>Login</Link>
          </li>
        )}
      </ul>{" "}
    </>
  );
};

export default NavbarMenu;
