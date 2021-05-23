import './styles.css';
import { getIngredientsData, getRecipesData, getUsersData } from './apiCalls';
import Recipe from '../src/classes/Recipe';
import Cookbook from '../src/classes/Cookbook';
import GroceryStore from '../src/classes/GroceryStore'
import User from '../src/classes/User';
import '../assets/star.svg'

// global variables
let ingredientsss = [];
let recipesss = [];
let usersss = [];
let cookbook, groceryStore
const user = new User();

// query selectors
const recipeCardsSection = document.getElementById('recipeCards');
const allRecipesSection = document.getElementById('allRecipesSection');
const recipeDetailContainer = document.getElementById('recipeDetailContainer');
const recipeDetailSection = document.getElementById('recipeDetailSection');
const filterNameInput = document.getElementById('filterNameInput');
const filterNameButton = document.getElementById('filterNameButton');
const filterIngInput = document.getElementById('filterIngInput');
const filterIngButton = document.getElementById('filterIngButton');
const checkboxes = document.getElementsByName('tagBox');
const tagSubmitButton = document.getElementById('tagSubmit');
const favCheckboxes = document.getElementsByName('favTagBox');
const favTagSubmitButton = document.getElementById('favTagSubmit');
const filterSearchSection = document.getElementById('filterSearchSection');
const filterFavoriteSection = document.getElementById('filterFavoriteSection');
const favoriteButton = document.getElementById('favoriteButton');
const title = document.getElementById('title');
const filterFavNameInput = document.getElementById('filterFavNameInput');
const filterFavNameButton = document.getElementById('filterFavNameButton');
const filterFavIngInput = document.getElementById('filterFavIngInput');
const filterFavIngButton = document.getElementById('filterFavIngButton');
const cookButton = document.getElementById('cookButton')

// event listeners
filterNameButton.addEventListener('click', showRecipesByName)
filterIngButton.addEventListener('click', showRecipesByIng)
tagSubmitButton.addEventListener('click', showRecipesByTags)
favTagSubmitButton.addEventListener('click', showFavRecipesByTags)
favoriteButton.addEventListener('click', showFavoritedRecipes)
title.addEventListener('click', showAllRecipes)
filterFavNameButton.addEventListener('click', showFavRecipesByName)
filterFavIngButton.addEventListener('click', showFavRecipesByIng)
cookButton.addEventListener('click', showToCookRecipes)

// load page
window.onload = onStartup();

function getData() {
  return Promise.all([getIngredientsData(), getRecipesData(), getUsersData()])
}

function onStartup() {
  getData()
    .then(([ingredientsData, recipeData, usersData]) => {
      ingredientsData.ingredientsData.forEach(ingredient => {
        ingredientsss.push(ingredient)
      })
      recipeData.recipeData.forEach(recipe => {
        recipesss.push(recipe)
      })
      usersData.usersData.forEach(user => {
        usersss.push(user)
      })
      cookbook = new Cookbook(recipesss);
      groceryStore = new GroceryStore(ingredientsss);
      updateRecipeCardSection(cookbook.cookbook);
    });
}

function updateRecipeCardSection(recipes) {
  recipeCardsSection.innerHTML = '';
  recipes.forEach(recipe => {
    recipeCardsSection.innerHTML += `<section class="recipe-card" id="${recipe.id}">
    <div class="image-section" id="${recipe.id}">
    <img class="recipe-image hover" id="imageSection" src="${recipe.image}">
    <h2 class="recipe-name" id="imageSection">${recipe.name}</h2>
    </div>
    <div class="icon-section">
    <span class="icon hover material-icons"id="selectFavorite">star</span>
    <span class="icon hover material-icons" id="selectToCook">outdoor_grill</span>
    </div>
    </section>`
  })
}
// functions
recipeCardsSection.addEventListener('click', function(event) {
  if (event.target.id === 'imageSection') {
    showRecipeDetails(event.target.parentElement.id)
  }
  if (event.target.id === 'selectFavorite') {
    let matchingRecipe = cookbook.cookbook.find(recipe => recipe.id == event.target.parentElement.parentElement.id)
    user.determineFavorite(matchingRecipe)
  }
  if (event.target.id === 'selectToCook') {
    let matchingRecipe = cookbook.cookbook.find(recipe => recipe.id == event.target.parentElement.parentElement.id)
    user.addToMealList(matchingRecipe)
  }
});

function showRecipeDetails(idNumber) {
  hide(filterSearchSection)
  hide(filterFavoriteSection)
  hide(allRecipesSection)
  show(recipeDetailContainer)
  const matchingRecipe = cookbook.cookbook.find(recipe => recipe.id == idNumber)
  const instanceOfRecipe = new Recipe(matchingRecipe)
  instanceOfRecipe.findIngredientNames(ingredientsss)
  recipeDetailSection.innerHTML += `
  <img src="${instanceOfRecipe.image}">
  <h3>${instanceOfRecipe.name}</h3>

  <h4>Ingredients</h4>
  <p>${instanceOfRecipe.necessaryIngredients.join(', ')}</p>

  <h4>Directions</h4>
  <p>${instanceOfRecipe.returnDirections().join('</p><p>')}</p>

  <h3>Cost</h3>
  <p>$${instanceOfRecipe.calculateCostOfIngredients(ingredientsss).toFixed(2)}</p>
  `
}

function showRecipesByName() {
  let filteredRecipe = cookbook.filterByName(filterNameInput.value)
  showRecipeDetails(filteredRecipe[0].id)
}

function showRecipesByIng() {
  updateRecipeCardSection(cookbook.filterByIngredient(filterIngInput.value, groceryStore))
}

function showRecipesByTags() {
  let checkedTags = [];
  checkboxes.forEach(box => {
    if (box.checked) {
      checkedTags.push(box.value)
    }
  });
  updateRecipeCardSection(cookbook.filterByTag(checkedTags))
}

function showFavoritedRecipes() {
  hide(filterSearchSection)
  hide(recipeDetailContainer)
  hide(recipeDetailSection)
  recipeDetailSection.innerHTML = '';
  show(filterFavoriteSection)
  show(allRecipesSection)
  updateRecipeCardSection(user.favoriteRecipes)
}

function showAllRecipes() {
  hide(filterFavoriteSection)
  hide(recipeDetailContainer)
  hide(recipeDetailSection)
  recipeDetailSection.innerHTML = '';
  show(filterSearchSection)
  show(allRecipesSection)
  updateRecipeCardSection(cookbook.cookbook)
}

function showFavRecipesByName() {
  let filteredRecipe = user.filterFavByName(filterFavNameInput.value)
  showRecipeDetails(filteredRecipe[0].id)
}

function showFavRecipesByIng() {
  updateRecipeCardSection(user.filterFavByIngredient(filterFavIngInput.value, groceryStore))
}

function showFavRecipesByTags() {
  let checkedTags = [];
  favCheckboxes.forEach(box => {
    if (box.checked) {
      checkedTags.push(box.value)
    }
  });
  updateRecipeCardSection(user.filterFavByTag(checkedTags))
}

function showToCookRecipes() {
  hide(filterSearchSection)
  hide(recipeDetailContainer)
  hide(recipeDetailSection)
  hide(filterFavoriteSection)
  recipeDetailSection.innerHTML = '';
  show(allRecipesSection)
  updateRecipeCardSection(user.recipesToCook)
}

// helper functions
function hide(e) {
  e.classList.add('hidden')
}

function show(e) {
  e.classList.remove('hidden')
}
