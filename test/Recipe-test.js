import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {

  let recipe, ingredients;
  beforeEach(() => {
    recipe = new Recipe({
      "id": 123456,
      "image": "https://cafedelites.com/wp-content/uploads/2018/04/Best-Chicken-Tikka-Masala-IMAGE-1.jpg",
      "ingredients": [
        {
          "id": 20081,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 18372,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
      ],
      "instructions": [
        {
          "instruction": "In a large bowl, combine yogurt, lemon juice, 2 teaspoons cumin, cinnamon, cayenne, black pepper, ginger, and salt. Stir in chicken, cover, and refrigerate for 1 hour.",
          "number": 1
        },
        {
          "instruction": "Preheat a grill for high heat.",
          "number": 2
        },
      ],
      "name": "Chicken Tikka Masala",
      "tags": [
        "indian",
        "chicken",
      ]
    });
    ingredients = [
      {
        "id": 20081,
        "name": "wheat flour",
        "estimatedCostInCents": 142
      },
      {
        "id": 18372,
        "name": "bicarbonate of soda",
        "estimatedCostInCents": 582
      },
    ]
  });

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('Should take in recipe object', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
    expect(recipe.id).to.deep.equal(123456);
    expect(recipe.image).to.deep.equal("https://cafedelites.com/wp-content/uploads/2018/04/Best-Chicken-Tikka-Masala-IMAGE-1.jpg");
    expect(recipe.ingredients[1].id).to.deep.equal(18372);
    expect(recipe.instructions[1].instruction).to.deep.equal("Preheat a grill for high heat.");
    expect(recipe.name).to.deep.equal("Chicken Tikka Masala");
    expect(recipe.tags[1]).to.deep.equal("chicken");
  });

  it('Should determine the names of ingredients needed', () => {
    recipe.findIngredientNames(ingredients)
    expect(recipe.necessaryIngredients).to.deep.equal(["wheat flour", "bicarbonate of soda"]);
  });

  it('Should get the cost of its ingredients', () => {
    expect(recipe.calculateCostOfIngredients(ingredients)).to.equal(((1.5 * 142) + (0.5 * 582)) / 100);
  });

  it('Should return its directions / instructions', () => {
    expect(recipe.returnDirections()).to.deep.equal([ '1: In a large bowl, combine yogurt, lemon juice, 2 teaspoons cumin, cinnamon, cayenne, black pepper, ginger, and salt. Stir in chicken, cover, and refrigerate for 1 hour.', '2: Preheat a grill for high heat.' ]);
  });
});
