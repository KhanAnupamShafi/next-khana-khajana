import { Recipe } from "@/models/recipe-model";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/dbconnect";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils";
import mongoose from "mongoose";

async function createUser(user) {
  try {
    await dbConnect();

    const isExistUser = await User.findOne({ email: user.email }).lean();
    if (!isExistUser) {
      return await User.create(user);
    } else {
      throw new Error("User already registered.");
    }
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
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
    throw new Error(`Error finding user by credentials: ${error.message}`);
  }
}

async function getAllRecipes() {
  try {
    await dbConnect();

    const allRecipes = await Recipe.find().lean();
    return replaceMongoIdInArray(allRecipes);
  } catch (error) {
    throw new Error(`Error getting all recipes: ${error.message}`);
  }
}

async function getRecipeById(recipeId) {
  try {
    const recipe = await Recipe.findById(recipeId).lean();
    if (recipe) {
      return replaceMongoIdInObject(recipe);
    }
  } catch (error) {
    throw new Error(`Error getting recipe by ID: ${error.message}`);
  }
}

async function getRecipeByCategory(categoryName) {
  try {
    await dbConnect();

    const recipe = await Recipe.find({ category: categoryName }).lean();
    return replaceMongoIdInArray(recipe);
  } catch (error) {
    throw new Error(`Error getting recipe by category: ${error.message}`);
  }
}

async function updateIsFavourite(recipeId, authUser) {
  try {
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
  } catch (error) {
    throw new Error(`Error updating favourite: ${error.message}`);
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
