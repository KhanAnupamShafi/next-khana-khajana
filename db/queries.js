import { Recipe } from "@/models/recipe-model";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/dbconnect";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils";
import mongoose from "mongoose";

async function createUser(user) {
  await dbConnect();

  const isExistUser = await User.findOne({ email: user.email }).lean();
  if (!isExistUser) {
    return await User.create(user);
  } else {
    throw new Error("User already registered.");
  }
}

async function findUserByCredentials(credentials) {
  await dbConnect();

  const user = await User.findOne(credentials).lean();
  if (user) {
    return replaceMongoIdInObject(user);
  }
  return null;
}

async function getAllRecipes() {
  await dbConnect();

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
  await dbConnect();

  const recipe = await Recipe.find({ category: categoryName }).lean();
  return replaceMongoIdInArray(recipe);
}

async function updateIsFavourite(recipeId, authUser) {
  await dbConnect();

  const user = await User.findById(authUser.id);

  if (user) {
    const foundRecipe = user.favourites.find(
      (id) => id.toString() === recipeId
    );

    if (foundRecipe) {
      user.favourites.pull(new mongoose.Types.ObjectId(recipeId));
    } else {
      user.favourites.push(new mongoose.Types.ObjectId(recipeId));
    }

    const res = await user.save();
    return res;
  }
}

export {
  createUser,
  findUserByCredentials,
  getAllRecipes,
  getRecipeByCategory,
  getRecipeById,
  updateIsFavourite,
};
