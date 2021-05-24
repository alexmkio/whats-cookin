class User {
  constructor() {
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };
  determineFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
    } else {
      const index = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(index, 1);
    };
  };
  addToMealList(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe);
    };
  };
  filterFavByTag(...tags) {
    const favoritesFiltered = [];
    tags.flat().forEach(tag => {
      this.favoriteRecipes.forEach(recipe => {
      if (recipe.tags.includes(tag) && !favoritesFiltered.includes(recipe)) {
        favoritesFiltered.push(recipe);
      };
      });
    });
    return favoritesFiltered;
  };
  filterFavByName(recipeName) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(recipeName));
  };
  filterFavByIngredient(ingredientName, ingredientRepo) {
  let foundIngredient = ingredientRepo.ingredients.find(ingredient => ingredient.name === ingredientName);
  let foundRecipes = this.favoriteRecipes.filter(recipe => {
    return recipe.ingredients.find(ingredient => ingredient.id === foundIngredient.id);
  });
  return foundRecipes;
  };
};

export default User;
