import { Recipe } from "@/models/recipe-model";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/dbconnect";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils";
import mongoose from "mongoose";

async function createUser(user) {
  try {
    await dbConnect();

    const isExistUser = await User.findOne({ email: user?.email }).lean();
    if (!isExistUser) {
      return await User.create(user);
    } else {
      throw new Error("User already registered.");
    }
  } catch (error) {
    throw new Error(`Error creating user: ${error?.message}`);
  }
}

async function findUserByCredentials(credentials) {
  try {
    await dbConnect();

    const user = await User.findOne(credentials).lean();
    if (user) {
      return replaceMongoIdInObject(user);
    }
    return null;
  } catch (error) {
    throw new Error(`Error finding user by credentials: ${error?.message}`);
  }
}

async function getAllRecipes() {
  try {
    await dbConnect();

    const allRecipes = await Recipe.find().lean();
    return replaceMongoIdInArray(allRecipes);
  } catch (error) {
    throw new Error(`Error getting all recipes: ${error?.message}`);
  }
}

async function getRecipeById(recipeId) {
  await dbConnect();

  const recipe = await Recipe.findById(recipeId).lean();
  return replaceMongoIdInObject(recipe);
}

async function getRecipeByCategory(categoryName) {
  try {
    await dbConnect();

    const recipe = await Recipe.find({ category: categoryName }).lean();
    return replaceMongoIdInArray(recipe);
  } catch (error) {
    throw new Error(`Error getting recipe by category: ${error?.message}`);
  }
}

async function updateIsFavourite(recipeId, authUser) {
  try {
    await dbConnect();

    const user = await User.findById(authUser?.id);

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
  } catch (error) {
    throw new Error(`Error updating favourite: ${error?.message}`);
  }
}

async function getCategories() {
  try {
    await dbConnect();

    const categories = await Recipe.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } },
    ]);

    // Extract category names from the result
    const categoryList = categories.map((category) => category.category);

    return categoryList;
  } catch (error) {
    throw new Error(`Error retrieving categories: ${error?.message}`);
  }
}

export {
  createUser,
  findUserByCredentials,
  getAllRecipes,
  getCategories,
  getRecipeByCategory,
  getRecipeById,
  updateIsFavourite,
};
