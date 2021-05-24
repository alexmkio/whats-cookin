import './styles.css';
import {
  getIngredientsData,
  getRecipesData,
  getUsersData
} from './apiCalls';
import Recipe from '../src/classes/Recipe';
import Cookbook from '../src/classes/Cookbook';
import GroceryStore from '../src/classes/GroceryStore'
import User from '../src/classes/User';

// global variables
let ingredientsPortfolio = [];
let recipesPortfolio = [];
let usersPortfolio = [];
let cookbook, groceryStore;
const user = new User();

// query selectors
const recipeCardsSection = document.getElementById('recipeCards');
const allRecipesSection = document.getElementById('allRecipesSection');
const recipeDetailContainer = document.getElementById('recipeDetailContainer');
const recipeDetailSection = document.getElementById('recipeDetailSection');
const filterNameInput = document.getElementById('filterNameInput');
const filterNameSection = document.getElementById('filterNameSection');
const filterIngInput = document.getElementById('filterIngInput');
const filterIngSection = document.getElementById('filterIngSection');
const checkboxes = document.getElementsByName('tagBox');
const tagSubmitButton = document.getElementById('tagSubmit');
const favCheckboxes = document.getElementsByName('favTagBox');
const favTagSubmitButton = document.getElementById('favTagSubmit');
const filterSearchSection = document.getElementById('filterSearchSection');
const filterFavoriteSection = document.getElementById('filterFavoriteSection');
const favoriteButton = document.getElementById('favoriteButton');
const title = document.getElementById('title');
const filterFavNameInput = document.getElementById('filterFavNameInput');
const filterFavNameSection = document.getElementById('filterFavNameSection');
const filterFavIngInput = document.getElementById('filterFavIngInput');
const filterFavIngSection = document.getElementById('filterFavIngSection');
const cookButton = document.getElementById('cookButton')

// event listeners
filterNameSection.addEventListener('submit', function() {
  showRecipesByName(event)
});
filterIngSection.addEventListener('submit', function() {
  showRecipesByIng(event)
});
tagSubmitButton.addEventListener('click', showRecipesByTags);
favTagSubmitButton.addEventListener('click', showFavRecipesByTags);
favoriteButton.addEventListener('click', showFavoritedRecipes);
title.addEventListener('click', showAllRecipes);
filterFavNameSection.addEventListener('submit', function() {
  showFavRecipesByName(event)
});
filterFavIngSection.addEventListener('submit', function() {
  showFavRecipesByIng(event)
});
cookButton.addEventListener('click', showToCookRecipes);

// load page
window.onload = onStartup();

function getData() {
  return Promise.all([getIngredientsData(), getRecipesData(), getUsersData()]);
}

function onStartup() {
  getData()
  .then(([ingredientsData, recipeData, usersData]) => {
      ingredientsData.ingredientsData.forEach(ingredient => {
        ingredientsPortfolio.push(ingredient);
      });
      recipeData.recipeData.forEach(recipe => {
        recipesPortfolio.push(recipe);
      });
      usersData.usersData.forEach(user => {
        usersPortfolio.push(user);
      });
      cookbook = new Cookbook(recipesPortfolio);
      groceryStore = new GroceryStore(ingredientsPortfolio);
      updateRecipeCardSection(cookbook.cookbook);
    });
};

function updateRecipeCardSection(recipes) {
  recipeCardsSection.innerHTML = '';
  recipes.forEach(recipe => {
    recipeCardsSection.innerHTML +=
    `<section class="recipe-card" id="${recipe.id}">
    <div class="image-section" id="${recipe.id}">
    <img class="recipe-image hover" id="imageSection" src="${recipe.image}" alt="Picture of ${recipe.name}">
    <h2 class="recipe-name" id="imageSection">${recipe.name}</h2>
    </div>
    <div class="icon-section">
    <span class="icon hover material-icons"id="selectFavorite">star</span>
    <span class="icon hover material-icons" id="selectToCook">outdoor_grill</span>
    </div>
    </section>`
  });
};

// functions
recipeCardsSection.addEventListener('click', function(event) {
  if (event.target.id === 'imageSection') {
    showRecipeDetails(event.target.parentElement.id);
  };
  if (event.target.id === 'selectFavorite') {
    let matchingRecipe = cookbook.cookbook.find(recipe =>
      recipe.id === parseInt(event.target.parentElement.parentElement.id));
    user.determineFavorite(matchingRecipe);
  };
  if (event.target.id === 'selectToCook') {
    let matchingRecipe = cookbook.cookbook.find(recipe =>
      recipe.id === parseInt(event.target.parentElement.parentElement.id));
    user.addToMealList(matchingRecipe);
  };
});

function showRecipeDetails(idNumber) {
  hide(filterSearchSection);
  hide(filterFavoriteSection);
  hide(allRecipesSection);
  show(recipeDetailContainer);
  const matchingRecipe = cookbook.cookbook.find(recipe => recipe.id === parseInt(idNumber));
  const instanceOfRecipe = new Recipe(matchingRecipe);
  instanceOfRecipe.findIngredientNames(ingredientsPortfolio);
  recipeDetailSection.innerHTML +=
  `<img src="${instanceOfRecipe.image}" alt="Picture of ${instanceOfRecipe.name}">
  <h3>${instanceOfRecipe.name}</h3>
  <h4>Ingredients</h4>
  <p>${instanceOfRecipe.necessaryIngredients.join(', ')}</p>
  <h4>Directions</h4>
  <p>${instanceOfRecipe.returnDirections().join('</p><p>')}</p>
  <h3>Cost</h3>
  <p>$${instanceOfRecipe.calculateCostOfIngredients(ingredientsPortfolio).toFixed(2)}</p>`
};

function showRecipesByName(event) {
  event.preventDefault();
  if (filterNameInput.value) {
    let filteredRecipe = cookbook.filterByName(filterNameInput.value);
    showRecipeDetails(filteredRecipe[0].id);
  }
  filterNameInput.value = '';
};

function showRecipesByIng() {
  event.preventDefault();
  if (filterIngInput.value) {
    updateRecipeCardSection(cookbook.filterByIngredient(filterIngInput.value, groceryStore));
  }
  filterIngInput.value = '';
};

function showRecipesByTags() {
  let checkedTags = [];
  checkboxes.forEach(box => {
    if (box.checked) {
      checkedTags.push(box.value);
    };
    box.checked = false;
  });
  updateRecipeCardSection(cookbook.filterByTag(checkedTags))
};

function showFavoritedRecipes() {
  hide(filterSearchSection);
  hide(recipeDetailContainer);
  hide(recipeDetailSection);
  recipeDetailSection.innerHTML = '';
  show(filterFavoriteSection);
  show(allRecipesSection);
  updateRecipeCardSection(user.favoriteRecipes);
};

function showAllRecipes() {
  hide(filterFavoriteSection);
  hide(recipeDetailContainer);
  hide(recipeDetailSection);
  recipeDetailSection.innerHTML = '';
  show(filterSearchSection);
  show(allRecipesSection);
  updateRecipeCardSection(cookbook.cookbook);
};

function showFavRecipesByName() {
  event.preventDefault();
  if (filterFavNameInput.value) {
    let filteredRecipe = user.filterFavByName(filterFavNameInput.value);
    showRecipeDetails(filteredRecipe[0].id);
  }
  filterFavNameInput.value = '';
};

function showFavRecipesByIng() {
  event.preventDefault();
  if (filterFavIngInput.value) {
    updateRecipeCardSection(user.filterFavByIngredient(filterFavIngInput.value, groceryStore));
  }
  filterFavIngInput.value = '';
};

function showFavRecipesByTags() {
  let checkedTags = [];
  favCheckboxes.forEach(box => {
    if (box.checked) {
      checkedTags.push(box.value);
    };
    box.checked = false;
  });
  updateRecipeCardSection(user.filterFavByTag(checkedTags));
};

function showToCookRecipes() {
  hide(filterSearchSection);
  hide(recipeDetailContainer);
  hide(recipeDetailSection);
  hide(filterFavoriteSection);
  recipeDetailSection.innerHTML = '';
  show(allRecipesSection);
  updateRecipeCardSection(user.recipesToCook);
};

// helper functions
function hide(e) {
  e.classList.add('hidden');
};

function show(e) {
  e.classList.remove('hidden');
};
