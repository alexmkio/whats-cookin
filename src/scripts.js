import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from '../src/classes/Cookbook';
import recipeData from '../src/data/recipes';

//query selectors
const recipeCardsSection = document.getElementById('recipeCards');

//global variables
const cookbook = new Cookbook(recipeData)

// event listeners

// functions
function updateRecipeCardSection() {
  cookbook.cookbook.forEach(recipe => {
    recipeCardsSection.innerHTML += `${recipe.name}`
  })
}
updateRecipeCardSection()
// updateRecipeCardSection();
console.log('Hello world');
