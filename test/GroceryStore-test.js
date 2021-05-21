import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';
import GroceryStore from '../src/classes/GroceryStore';

describe('Grocery Store', () => {
  let ingredientList, ingredientData, ingredientRepo;
  beforeEach(() => {
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
  });

  it('Should be a function', () => {
    expect(GroceryStore).to.be.a('function');
  });

  it('Should take in an array of object', () => {
    expect(ingredientRepo.ingredients).to.deep.equal(ingredientData)
    expect(ingredientRepo.ingredients).to.not.deep.equal([])
  })
});
