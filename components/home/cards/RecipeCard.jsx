import { getBlurData } from "@/utils/getBlurImage";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = async ({ recipeData }) => {
  const { id, name, thumbnail, author, rating } = recipeData;
  const { base64 } = await getBlurData(thumbnail);

  return (
    <div className='card cursor-pointer'>
      <div className='w-[300px] h-[160px] relative'>
        <Image
          src={thumbnail}
          className='rounded-md'
          alt={`${name}_image`}
          loading='eager'
          layout='fill'
          placeholder='blur'
          blurDataURL={base64}
        />
      </div>
      <Link href={`/recipe/${id}`}>
        <h4 className='my-2'>{name}</h4>
      </Link>
      <div className='py-2 flex justify-between text-xs text-gray-500'>
        <span>⭐️ {rating.toFixed(1)}</span>
        <span>By: {author}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
