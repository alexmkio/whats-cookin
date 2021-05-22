export const getIngredientsData = () => fetch("http://localhost:3001/api/v1/ingredients")
    .then(response => response.json())

export const getRecipesData = () => fetch("http://localhost:3001/api/v1/recipes")
    .then(response => response.json())

export const getUsersData = () => fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())