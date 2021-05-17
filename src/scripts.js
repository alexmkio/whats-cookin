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
    recipeCardsSection.innerHTML += `<section>
      <img src="${recipe.image}">
      <h1>${recipe.name}</h1>
      <img id="favoriteButton">
      <img id="recipesToCookButton">
    </section>`
  })
}
updateRecipeCardSection()
// updateRecipeCardSection();
console.log('Hello world');
