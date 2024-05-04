"use server";
import {
  createUser,
  findUserByCredentials,
  getCategories,
  updateIsFavourite,
} from "@/db/queries";
import { replaceMongoIdInObject } from "@/utils";
import { redirect } from "next/navigation";

async function registerUser(formData) {
  try {
    const user = Object.fromEntries(formData);
    await createUser(user);
    redirect("/login");
  } catch (error) {
    // Handle registration error
    console.error("Error registering user:", error);
    // Optionally, redirect to an error page or return an error message
    throw new Error("User registration failed");
  }
}

async function loginUser(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    // Handle login error
    console.error("Error logging in user:", error);
    // Optionally, redirect to an error page or return an error message
    throw new Error("Login failed");
  }
}

async function retrieveCategories() {
  try {
    const categories = await getCategories();
    return categories;
  } catch (error) {
    // Handle category retrieval error
    console.error("Error retrieving categories:", error);
    // Optionally, redirect to an error page or return an error message
    throw new Error("Failed to retrieve categories");
  }
}

async function addToFavourite(recipeId, auth) {
  try {
    const res = await updateIsFavourite(recipeId, auth);
    return replaceMongoIdInObject(res?._doc);
  } catch (error) {
    // Handle addToFavourite error
    console.error("Error adding to favorites:", error);
    // Optionally, redirect to an error page or return an error message
    throw new Error("Failed to add to favorites");
  }
}

export { addToFavourite, loginUser, registerUser, retrieveCategories };
