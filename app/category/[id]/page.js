import RecipeCard from "@/components/home/cards/RecipeCard";
import { getRecipeByCategory } from "@/db/queries";

const page = async ({ params: { id } }) => {
  const categoryName = decodeURIComponent(id);
  const recipes = await getRecipeByCategory(categoryName);
  return (
    <section className='container py-8'>
      <div>
        {recipes.length > 0 ? (
          <>
            <h3 className='font-semibold text-xl'>{categoryName}</h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-items-center'>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipeData={recipe} />
              ))}
            </div>
          </>
        ) : (
          <p>{`Recipe Category ${categoryName} Not Found!`}</p>
        )}
      </div>
    </section>
  );
};

export default page;
