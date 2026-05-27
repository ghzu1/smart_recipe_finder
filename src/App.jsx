import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import { getRecipeDetails } from "./services/recipeService";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
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
  return (
    <div>
      <Navbar />

      <h1>Welcome to Smart Recipe Finder</h1>

      <SearchBar setRecipes={setRecipes} />

      <h2>Search Results</h2>
        
      {selectedRecipe && (
        <div>
          <h2>{selectedRecipe.title}</h2>
          <img src={selectedRecipe.image} alt={selectedRecipe.title} width="300" />
          <p>Ready in: {selectedRecipe.readyInMinutes} minutes</p>
          <p>Servings: {selectedRecipe.servings}</p>

          <h3>Instructions</h3>
          <p>{selectedRecipe.instructions}</p>
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