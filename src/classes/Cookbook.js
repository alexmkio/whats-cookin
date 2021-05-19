class Cookbook {
  constructor(recipes) {
    this.cookbook = recipes;
  }
  filterByTag(...tags) {
    const cookbookFiltered = [];
    tags.forEach(tag => {
      this.cookbook.forEach(recipe => {
      if (recipe.tags.includes(tag)) {
        cookbookFiltered.push(recipe)
      }
      });
    })
    return cookbookFiltered
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
