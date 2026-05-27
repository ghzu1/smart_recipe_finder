import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { getRecipeDetails } from "./services/recipeService";
import Inventory from "./components/Inventory";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const savedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(savedInventory);
  }, []);

  function addToFavorites(recipe) {
    const alreadyExists = favorites.find(
      (favorite) => favorite.id === recipe.id
    );

    if (alreadyExists) {
      return;
    }

    const updatedFavorites = [...favorites, recipe];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  function removeFromFavorites(id) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== id
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  async function showRecipeDetails(id) {
    const recipeDetails = await getRecipeDetails(id);
    console.log(recipeDetails);
    setSelectedRecipe(recipeDetails);
  }

  function searchFromInventory() {
    const ingredients = inventory.map((item) => item.name).join(",");

    if (ingredients === "") {
      return;
    }

    setRecipes([]);

    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=12&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }

  
  function cookRecipe() {
  if (!selectedRecipe || !selectedRecipe.extendedIngredients) {
    return;
  }

  const usedIngredients = selectedRecipe.extendedIngredients.map((ingredient) =>
    ingredient.name.toLowerCase()
  );

  const updatedInventory = inventory
    .map((item) => {
      const itemName = item.name.toLowerCase();

      const isUsed = usedIngredients.some((ingredient) =>
        ingredient.includes(itemName)
      );

      if (isUsed) {
        return {
          ...item,
          amount: item.amount - 1,
        };
      }

      return item;
    })
    .filter((item) => item.amount > 0);

  setInventory(updatedInventory);
  localStorage.setItem("inventory", JSON.stringify(updatedInventory));
}

  return (
    <div>
      <Navbar />

      <h1>Welcome to Smart Recipe Finder</h1>

      <SearchBar setRecipes={setRecipes} />

      <Inventory inventory={inventory} setInventory={setInventory} />

      <button onClick={searchFromInventory}>
        Find Recipes From Inventory
      </button>

      <h2>Search Results</h2>

      {selectedRecipe && (
        <div>
          <h2>{selectedRecipe.title}</h2>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} width="300" />
          <p>Ready in: {selectedRecipe.readyInMinutes} minutes</p>
          <p>Servings: {selectedRecipe.servings}</p>

          <h3>Instructions</h3>
          <p>{selectedRecipe.instructions}</p>

          <button onClick={cookRecipe}>
            Cook Recipe
          </button>
        </div>
      )}

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <h3>{recipe.title}</h3>
            <button onClick={() => addToFavorites(recipe)}>❤️ Favorite</button>
            <button onClick={() => showRecipeDetails(recipe.id)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      <h2>Favorites</h2>

      <div className="recipe-container">
        {favorites.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <h3>{recipe.title}</h3>
            <button onClick={() => removeFromFavorites(recipe.id)}>
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;