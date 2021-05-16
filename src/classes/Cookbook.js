class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
  }
  filterByTag(tag) {
    return this.cookbook.filter(item => item.tags.includes(tag));
  }
  filterByName(recipeName) {
    return this.cookbook.filter(item => item.name.includes(recipeName));

  }
  filterByIngredient(ingredientName, ingredientRepo) {
  let foundIngredient = ingredientRepo.ingredients.find(ingredient => ingredient.name === ingredientName)
  let foundRecipes = this.cookbook.filter(recipe => {
    return recipe.ingredients.find(ingredient => ingredient.id === foundIngredient.id)
  })
  return foundRecipes
  }
}

export default Cookbook;
