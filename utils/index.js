export const replaceMongoIdInArray = (array) => {
  const mappedArray = array.map(({ _id, ...item }) => ({
    id: _id.toString(),
    ...item,
  }));
  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

// export const extractUniqueCategories = (recipesAra) => {
//   const uniqueCategories = new Set();
//   recipesAra.forEach((recipe) => {
//     uniqueCategories.add(recipe.category);
//   });

//   const uniqueCategoryNames = [...uniqueCategories];
//   return uniqueCategoryNames;
// };
