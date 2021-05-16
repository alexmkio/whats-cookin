import { expect } from 'chai';
import Ingredient from '../src/classes/Ingredient';

describe('Ingredient', () => {
  let ingredient1, ingredient2, ingredient3
  beforeEach(() => {
    ingredient1 = new Ingredient(9079, 'dried cranberries', 921);
    ingredient2 = new Ingredient(11935, 'catsup', 666);
    ingredient3 = new Ingredient(12151, 'pistachio', 813);

  })

  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should have an id', () => {
    expect(ingredient1.id).to.equal(9079);
    expect(ingredient2.id).to.equal(11935);
    expect(ingredient3.id).to.not.equal(9079);
  });

  it('should have a name', () => {
    expect(ingredient1.name).to.equal('dried cranberries');
    expect(ingredient2.name).to.equal('catsup');
    expect(ingredient3.name).to.not.equal('catsup');
  });

  it('should have a cost', () => {
    expect(ingredient1.estimatedCostInCents).to.equal(921);
    expect(ingredient2.estimatedCostInCents).to.equal(666);
    expect(ingredient3.estimatedCostInCents).to.not.equal(666);
  })


})
