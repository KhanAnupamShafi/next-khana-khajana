"use server";
import { createUser, findUserByCredentials, getAllRecipes } from "@/db/queries";
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
  const allRecipe = await getAllRecipes();
  // eslint-disable-next-line no-undef
  const categoryList = [...new Set(allRecipe.map((recipe) => recipe.category))];

  return categoryList;
}

export { loginUser, registerUser, retrieveCategories };
