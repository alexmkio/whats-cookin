import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('Recipe', () => {

  let recipe
  beforeEach(() => {
    recipe = new RecipeRepository({
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
  })    

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should take in recipe object', () => {
    expect(recipe).to.be.an.instanceof(RecipeRepository);
    expect(recipe.id).to.deep.equal(123456);
    expect(recipe.image).to.deep.equal("https://cafedelites.com/wp-content/uploads/2018/04/Best-Chicken-Tikka-Masala-IMAGE-1.jpg");
    expect(recipe.ingredients[1].id).to.deep.equal(18372);
    expect(recipe.instructions[1].instruction).to.deep.equal("Preheat a grill for high heat.");
    expect(recipe.name).to.deep.equal("Chicken Tikka Masala");
    expect(recipe.tags[1]).to.deep.equal("chicken");
  });

})