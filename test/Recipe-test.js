import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {

  let recipe
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
    })
  })    

  it('Should be a function', () => {
    expect(Recipe).to.be.a('function');
  });
})