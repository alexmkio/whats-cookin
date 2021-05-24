import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';
import Cookbook from '../src/classes/Cookbook';
import Ingredient from '../src/classes/Ingredient';
import GroceryStore from '../src/classes/GroceryStore';

describe('Cookbook', () => {

  let recipe1, recipe2, recipes, ingredientData, ingredientList, ingredientRepo;
  beforeEach(() => {
    recipe1 = new Recipe({
      "id": 123456,
      "image": "https://cafedelites.com/wp-content/uploads/2018/04/Best-Chicken-Tikka-Masala-IMAGE-1.jpg",
      "ingredients": [
        {
          "id": 9079,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        },
        {
          "id": 11935,
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
    recipe2 = new Recipe({
      "id": 987654,
      "image": "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/10/moist-banana-bread.jpg",
      "ingredients": [
        {
          "id": 12151,
          "quantity": {
            "amount": 1,
            "unit": "c"
          }
        },
        {
          "id": 11821,
          "quantity": {
            "amount": 2,
            "unit": "tsp"
          }
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
    });
    recipes = new Cookbook([recipe1, recipe2]);
    ingredientData = [
      {
        "id": 9079,
        "name": "dried cranberries",
        "estimatedCostInCents": 921
      },
      {
        "id": 11935,
        "name": "catsup",
        "estimatedCostInCents": 666
      },
      {
        "id": 12151,
        "name": "pistachio",
        "estimatedCostInCents": 813
      },
      {
        "id": 11821,
        "name": "red sweet peppers",
        "estimatedCostInCents": 1027
      },
      {
        "id": 6615,
        "name": "vegetable stock",
        "estimatedCostInCents": 613
      },
    ];
    ingredientList = ingredientData.map(ingredient => {
      return new Ingredient(
        ingredient.id,
        ingredient.name,
        ingredient.estimatedCostInCents
      );
    });
    ingredientRepo = new GroceryStore(ingredientList);
  });

  it('Should be a function', () => {
    expect(Cookbook).to.be.a('function');
  });

  it('Should have a parameter to take in recipe data', () => {
    expect(recipes.cookbook).to.deep.equal([recipe1, recipe2]);
  });

  it('Should filter list of recipes based on one tags', () => {
    expect(recipes.filterByTag('dessert')).to.deep.equal([recipe2]);
    expect(recipes.filterByTag('dessert')).to.not.deep.equal([recipe1]);
  });

  it('Should filter list of recipes based on one or more tags', () => {
    expect(recipes.filterByTag('indian', 'dessert')).to.deep.equal([recipe1, recipe2]);
  });

  it('Should filter list of recipes based on its name', () => {
    expect(recipes.filterByName('Chicken Tikka Masala')).to.deep.equal([recipe1]);
    expect(recipes.filterByName('Chicken Tikka Masala')).to.not.deep.equal([recipe2]);
  });

  it('Should filter list of recipes based on ingredient name', () => {
    expect(recipes.filterByIngredient('dried cranberries', ingredientRepo)).to.deep.equal([recipe1]);
  });
});
