const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

async function searchRecipes(searchText) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&number=12&apiKey=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
}

export default searchRecipes;