"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RecipeCard = ({ recipeData }) => {
  const { id, name, thumbnail, author, rating } = recipeData;
  const router = useRouter();
  return (
    <Link
      href={`/recipe/${id}`}
      className='card cursor-pointer'
      onClick={() => router.push(`/recipe/${id}`)}>
      <Image
        src={thumbnail}
        className='rounded-md h-[300] w-[300]'
        alt={`${name}_image`}
        height={300}
        width={300}
      />
      <h4 className='my-2'>{name}</h4>
      <div className='py-2 flex justify-between text-xs text-gray-500'>
        <span>⭐️ {rating.toFixed(1)}</span>
        <span>By: {author}</span>
      </div>
    </Link>
  );
};

export default RecipeCard;
