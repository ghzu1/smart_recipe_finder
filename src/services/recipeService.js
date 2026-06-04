const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

async function searchRecipes(searchText) {
  const encodedSearchText = encodeURIComponent(searchText);

  const response = await fetch(
    `${BASE_URL}/complexSearch?query=${encodedSearchText}&number=12&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

async function getRecipeDetails(id) {
  const response = await fetch(
    `${BASE_URL}/${id}/information?apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

async function searchRecipesByIngredients(ingredients) {
  const encodedIngredients = encodeURIComponent(ingredients);

  const response = await fetch(
    `${BASE_URL}/findByIngredients?ingredients=${encodedIngredients}&number=12&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data;
}

export { searchRecipes, getRecipeDetails, searchRecipesByIngredients };