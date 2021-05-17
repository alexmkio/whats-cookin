import './styles.css';
import apiCalls from './apiCalls';
import Cookbook from '../src/classes/Cookbook';
import recipeData from '../src/data/recipes';

//query selectors
const recipeCardsSection = document.getElementById('recipeCards');

//global variables
const cookbook = new Cookbook(recipeData)
console.log(cookbook.cookbook[0])

// event listeners

// functions
// function updateRecipeCardSection() {
//   cookbook.
//   recipeCardsSection.innerHTML +=
// }

// updateRecipeCardSection();
console.log('Hello world');
