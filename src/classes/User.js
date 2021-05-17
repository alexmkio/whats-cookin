class User {
  constructor() {
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  determineFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    } else {
      const index = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(index, 1);
    }
  }
  addToMealList(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.push(recipe)
    }
  }
  filterFavByTag(tag) {
    return this.favoriteRecipes.filter(recipe => recipe.tags.includes(tag));
  }
}

export default User;
