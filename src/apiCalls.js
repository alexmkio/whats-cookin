export const ingredients = () => {
  return fetch("http://localhost:3001/api/v1/ingredients")
    .then(response => response.json())
    .then(data => data)
} 

export const recipes = () => {
  return fetch("http://localhost:3001/api/v1/recipes")
    .then(response => response.json())
    .then(data => data)
} 

export const users = () => {
  return fetch("http://localhost:3001/api/v1/users")
    .then(response => response.json())
    .then(data => data)
} 