import RecipeCard from "@/components/home/cards/RecipeCard";
import Loader from "@/components/spinner/Loader";
import { getRecipeByCategory } from "@/db/queries";
import { Suspense } from "react";

export async function generateMetadata({ params: { id } }) {
  const categoryName = decodeURIComponent(id);
  return {
    title: `Category - ${categoryName}`,
  };
}

const page = async ({ params: { id } }) => {
  const categoryName = decodeURIComponent(id);
  const recipes = await getRecipeByCategory(categoryName);
  return (
    <section className='container py-8'>
      <Suspense fallback={<Loader />}>
        {recipes?.length > 0 ? (
          <>
            <h3 className='font-semibold text-xl'>{categoryName}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center'>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe?.id} recipeData={recipe} />
              ))}
            </div>
          </>
        ) : (
          <p>{`Recipe Category ${categoryName} Not Found!`}</p>
        )}
      </Suspense>
    </section>
  );
};

export default page;
