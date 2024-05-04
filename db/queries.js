import { Recipe } from "@/models/recipe-model";
import { User } from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils";

async function createUser(user) {
  const isExistUser = await User.findOne({ email: user.email }).lean();
  if (!isExistUser) {
    return await User.create(user);
  } else {
    throw new Error("User already registered.");
  }
}

async function findUserByCredentials(credentials) {
  const user = await User.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function getAllRecipes() {
  const allRecipes = await Recipe.find().lean();
  return replaceMongoIdInArray(allRecipes);
}
async function getRecipeById(recipeId) {
  const recipe = await Recipe.findById(recipeId).lean();
  if (recipe) {
    return replaceMongoIdInObject(recipe);
  }
}
async function getRecipeByCategory(categoryName) {
  const recipe = await Recipe.find({ category: categoryName }).lean();
  return replaceMongoIdInArray(recipe);
}

export {
  createUser,
  findUserByCredentials,
  getAllRecipes,
  getRecipeByCategory,
  getRecipeById,
};
