"use server";
import {
  createUser,
  findUserByCredentials,
  updateIsFavourite,
} from "@/db/queries";
import { Recipe } from "@/models/recipe-model";
import { replaceMongoIdInObject } from "@/utils";
import { redirect } from "next/navigation";

async function registerUser(formData) {
  const user = Object.fromEntries(formData);
  await createUser(user);
  redirect("/login");
}

async function loginUser(formData) {
  const credential = {};
  credential.email = formData.get("email");
  credential.password = formData.get("password");
  const found = await findUserByCredentials(credential);
  return found;
}
async function retrieveCategories() {
  const categories = await Recipe.aggregate([
    { $group: { _id: "$category" } },
    { $project: { _id: 0, category: "$_id" } },
  ]);
  // Extract category names from the result
  const categoryList = categories.map((category) => category.category);

  return categoryList;
}

async function addToFavourite(recipeId, auth) {
  const res = await updateIsFavourite(recipeId, auth);
  return replaceMongoIdInObject(res?._doc);
}

export { addToFavourite, loginUser, registerUser, retrieveCategories };
