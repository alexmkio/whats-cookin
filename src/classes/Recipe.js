// const data = require('./src/data/ingredients');
// const ingredients = data.ingredientsData;

class Recipe {
  constructor(thisRecipe) {
    this.id = thisRecipe.id;
    this.image = thisRecipe.image;
    this.ingredients = thisRecipe.ingredients;
    this.instructions = thisRecipe.instructions;
    this.name = thisRecipe.name;
    this.tags = thisRecipe.tags;
    this.necessaryIngredientIDs = [];
    this.necessaryIngredients = [];
  }
  findIngredientNames(ingredients) {
    this.ingredients.forEach(element => this.necessaryIngredientIDs.push(element.id));
    this.necessaryIngredients = ingredients.reduce((acc, item) => {
      if(this.necessaryIngredientIDs.includes(item.id)){
        acc.push(item.name)
      }
      return acc;
    }, []);
  }
}

export default Recipe;