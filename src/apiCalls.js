const message = "The website is failing to load some of it's resources. Did you follow the installation instructions completely? Did you clone down, install, and start the API repo? Do better!"

export const getIngredientsData = () =>
  fetch("http://localhost:3001/api/v1/ingredients")
    .then(response => response.json())
    .catch(err => alert(message))

export const getRecipesData = () =>
  fetch("http://localhost:3001/api/v1/recipes")
    .then(response => response.json())
    .catch(err => alert(message))

export const getUsersData = () =>
  fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .catch(err => alert(message))