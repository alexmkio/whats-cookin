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
  calculateCostOfIngredients(ingredients) {
    //reduce to find
    console.log('THE RECIPE OBJECT', this.ingredients)
    console.log('INGREDIENTS', ingredients)

    const totalCost = ingredients.reduce((acc, item) => {
      let currentIngredient = this.ingredients.find(ingredient => ingredient.id === item.id)
      console.log('CURRENT INGREDIENT', currentIngredient)
      if(currentIngredient){
        console.log('amount', currentIngredient.quantity.amount)
        console.log('estimated cost', item.estimatedCostInCents)
        acc += currentIngredient.quantity.amount * item.estimatedCostInCents
      }
      return acc;
    }, 0);
    return totalCost;
  }

// pass in ingredient = [{id:, cost:}]
// this.ingredients = [{id:, amount:}]
// if ingredient[index].id = ingredients[index].id
// return += ingredient[index].cost * ingredients[index].amount
  returnDirections() {
    const directions = this.instructions.map(item => `${item.number}: ${item.instruction}`);
    return directions.join(' ')
  }
}

export default Recipe;
