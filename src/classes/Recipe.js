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
  };
  findIngredientNames(ingredients) {
    this.ingredients.forEach(ingredient => this.necessaryIngredientIDs.push(ingredient.id));
    this.necessaryIngredients = ingredients.reduce((acc, item) => {
      if(this.necessaryIngredientIDs.includes(item.id)){
        acc.push(item.name);
      };
      return acc;
    }, []);
  };
  calculateCostOfIngredients(ingredients) {
    const totalCost = this.ingredients.reduce((acc, currentIngredient) => {
      let foundIngredient = ingredients.find(ingredient => ingredient.id === currentIngredient.id);
      acc += currentIngredient.quantity.amount * foundIngredient.estimatedCostInCents;
      return acc;
    }, 0);
    return totalCost / 100;
  };
  returnDirections() {
    return this.instructions.map(item => `${item.number}: ${item.instruction}`);
  };
};

export default Recipe;
