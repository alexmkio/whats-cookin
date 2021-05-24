import { expect } from 'chai';
import User from '../src/classes/User';
import Recipe from '../src/classes/Recipe';
import Ingredient from '../src/classes/Ingredient';
import GroceryStore from '../src/classes/GroceryStore';

describe('User', () => {
  let aUser, recipe1, recipe2, ingredientData, ingredientList, ingredientRepo;
  beforeEach(() => {
    aUser = new User();
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
    })
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
    })
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
      }
    ];
    ingredientList = ingredientData.map(ingredient => {
      return new Ingredient(
        ingredient.id,
        ingredient.name,
        ingredient.estimatedCostInCents
      );
    });
    ingredientRepo = new GroceryStore(ingredientList);
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('Should allow a user to favorite or unfavorite recipes', () => {
    expect(aUser.favoriteRecipes).to.deep.equal([]);
    
    aUser.determineFavorite(recipe1)
    expect(aUser.favoriteRecipes).to.deep.equal([recipe1]);
    
    aUser.determineFavorite(recipe1)
    expect(aUser.favoriteRecipes).to.deep.equal([]);
  });

  it('Should decide to cook a recipe that week (add to my recipesToCook)', () => {
    expect(aUser.recipesToCook).to.deep.equal([]);
    
    aUser.addToMealList(recipe1)
    expect(aUser.recipesToCook).to.deep.equal([recipe1]);

    aUser.addToMealList(recipe2)
    expect(aUser.recipesToCook).to.deep.equal([recipe1, recipe2]);
  });

  it('Should filter favoriteRecipes by one tag', () => {
    aUser.determineFavorite(recipe1)
    aUser.determineFavorite(recipe2)

    expect(aUser.filterFavByTag('dessert')).to.deep.equal([recipe2]);
    expect(aUser.filterFavByTag('dessert')).to.not.deep.equal([recipe1]);
  });

  it('Should filter favoriteRecipes by one or more tags', () => {
    aUser.determineFavorite(recipe1)
    aUser.determineFavorite(recipe2)

    expect(aUser.filterFavByTag('indian', 'dessert')).to.deep.equal([recipe1, recipe2]);
    });

  it('Should filter favoriteRecipes by name', () => {
    aUser.determineFavorite(recipe1)
    aUser.determineFavorite(recipe2)

    expect(aUser.filterFavByName('Chicken Tikka Masala')).to.deep.equal([recipe1]);
    expect(aUser.filterFavByName('Chicken Tikka Masala')).to.not.deep.equal([recipe2]);
  });

  it('Should filter favoriteRecipes by ingredient name', () => {
    aUser.determineFavorite(recipe1)
    aUser.determineFavorite(recipe2)

    expect(aUser.filterFavByIngredient('dried cranberries', ingredientRepo)).to.deep.equal([recipe1]);
  });
})