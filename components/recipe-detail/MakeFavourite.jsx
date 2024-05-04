"use client";

import { addToFavourite } from "@/app/actions";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const MakeFavourite = ({ recipeId }) => {
  const router = useRouter();

  const { auth, setAuth } = useAuth();
  const [isPending, startTransition] = useTransition();
  const isFavourite = auth?.favourites?.find((itemId) => itemId === recipeId);

  const toggleFavourite = async () => {
    if (auth) {
      const userUpdateInfo = await addToFavourite(recipeId, auth);
      setAuth(userUpdateInfo);
    } else {
      router.push("/login");
    }
  };
  return (
    <div
      className={`flex gap-2 ${
        isFavourite ? "text-[#eb4a36]" : "text-gray-600"
      } cursor-pointer hover:text-[#eb4a36]`}
      onClick={() =>
        startTransition(() => {
          toggleFavourite();
        })
      }>
      {isPending ? (
        <div className='animate-pulse'>please wait ...</div>
      ) : (
        <>
          {isFavourite ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              class='w-6 h-6'>
              <path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
            </svg>
          ) : (
            // Heart icon when the recipe is not a favourite
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='icon icon-tabler icons-tabler-outline icon-tabler-heart'>
              <path stroke='none' d='M0 0h24v24H0z' fill='none' />
              <path d='M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572' />
            </svg>
          )}
          <span>Favourite</span>
        </>
      )}
    </div>
  );
};

export default MakeFavourite;
