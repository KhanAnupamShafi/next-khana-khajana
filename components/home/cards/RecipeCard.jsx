import { getBlurData } from "@/utils/getBlurImage";
import Image from "next/image";
import Link from "next/link";

const RecipeCard = async ({ recipeData }) => {
  const { id, name, thumbnail, author, rating } = recipeData;
  const { base64 } = await getBlurData(thumbnail);

  return (
    <div className='card cursor-pointer'>
      <Image
        src={thumbnail}
        className='rounded-md h-[300] w-[300]'
        alt={`${name}_image`}
        height={300}
        width={300}
        placeholder='blur'
        blurDataURL={base64}
      />
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
