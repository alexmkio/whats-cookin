import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('RecipeRepository', () => {

  let recipe1, recipe2, recipes
  beforeEach(() => {
    recipe1 = new Recipe({
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
    })
    recipe2 = new Recipe({
      "id": 987654,
      "image": "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/10/moist-banana-bread.jpg",
      "ingredients": [
        {
          "id": 1123,
          "name": "eggs",
          "estimatedCostInCents": 472
        },
        {
          "id": 19335,
          "name": "sucrose",
          "estimatedCostInCents": 902
        },
      ],
      "instructions": [
        {
          "instruction": "Preheat oven to 350 degrees F (175 degrees C). Lightly grease a 9x5 inch loaf pan.",
          "number": 1
        },
        {
          "instruction": "In a large bowl, combine flour, baking soda and salt. In a separate bowl, cream together butter and brown sugar. Stir in eggs and mashed bananas until well blended. Stir banana mixture into flour mixture; stir just to moisten. Pour batter into prepared loaf pan.",
          "number": 2
        },
      ],
      "name": "Banana Banana Bread",
      "tags": [
        "dessert",
        "breakfast",
      ]
    })
    recipes = new RecipeRepository([recipe1, recipe2]);
  })    

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should have a parameter to take in recipe data', () => {
    expect(recipes.cookbook).to.deep.equal([recipe1, recipe2]);
  });
})
