class User {
  constructor() {
    this.favoriteRecipes = [];
  }
  determineFavorite(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe)
    } else {
      const index = this.favoriteRecipes.indexOf(recipe);
      this.favoriteRecipes.splice(index, 1);
    }
  }
}

export default User;
