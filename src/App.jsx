import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Inventory from "./components/inventory";
import { getRecipeDetails, searchRecipes } from "./services/recipeService";
import RecentSearches from "./components/RecentSearches";

function loadSavedList(key) {
  const saved = localStorage.getItem(key);

  try {
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => loadSavedList("favorites"));
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [inventory, setInventory] = useState(() => loadSavedList("inventory"));
  const [recentSearches, setRecentSearches] = useState(() =>
    loadSavedList("recentSearches")
  );

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
    setSelectedRecipe(recipeDetails);
  }

  function searchFromInventory() {
    const ingredients = inventory.map((item) => item.name).join(",");

    if (ingredients === "") {
      return;
    }

    const encodedIngredients = encodeURIComponent(ingredients);

    setRecipes([]);

    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodedIngredients}&number=12&apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
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

  function saveSearch(term) {
    if (!term || recentSearches.includes(term)) {
      return;
    }

    const updatedSearches = [term, ...recentSearches].slice(0, 5);

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  }

  async function handleSearch(term) {
    const searchTerm = term.trim();

    if (!searchTerm) {
      return;
    }

    saveSearch(searchTerm);

    const results = await searchRecipes(searchTerm);
    setRecipes(results);
  }

  function removeRecentSearch(index) {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  }

  return (
    <div className="app-container">
      <Navbar />

      <main>
        <section className="hero" id="search">
          <p className="eyebrow">Simple cooking helper</p>
          <h1>Smart Recipe Finder</h1>
          <p>
            Find recipes based on the ingredients you already have at home.
          </p>
        </section>

        <section className="search-panel">
          <SearchBar setRecipes={setRecipes} onSearch={handleSearch} />

          <RecentSearches
            recentSearches={recentSearches}
            onSearchClick={(term) => handleSearch(term)}
            onRemove={removeRecentSearch}
          />
        </section>

        <Inventory inventory={inventory} setInventory={setInventory} />

        <div className="inventory-action">
          <button onClick={searchFromInventory}>
            Find Recipes From Inventory
          </button>
        </div>

        <section className="section-block">
          <h2>Search Results</h2>

          {recipes.length === 0 ? (
            <p className="empty-state">
              Search for a recipe or use your kitchen inventory to get ideas.
            </p>
          ) : (
            <div className="recipe-container">
              {recipes.map((recipe) => (
                <div className="recipe-card" key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} width="200" />

                  <div className="recipe-card-content">
                    <h3>{recipe.title}</h3>

                    <button onClick={() => addToFavorites(recipe)}>
                      Add favorite
                    </button>

                    <button
                      className="secondary-button"
                      onClick={() => showRecipeDetails(recipe.id)}
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="section-block" id="favorites">
          <h2>Favorites</h2>

          {favorites.length === 0 ? (
            <p className="empty-state">
              Your saved recipes will show up here.
            </p>
          ) : (
            <div className="recipe-container">
              {favorites.map((recipe) => (
                <div className="recipe-card" key={recipe.id}>
                  <img src={recipe.image} alt={recipe.title} width="200" />

                  <div className="recipe-card-content">
                    <h3>{recipe.title}</h3>

                    <button onClick={() => removeFromFavorites(recipe.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedRecipe && (
          <div className="details-card">
            <div className="modal-card">
              <button
                className="close-button"
                onClick={() => setSelectedRecipe(null)}
              >
                x
              </button>

              <h2>{selectedRecipe.title}</h2>

              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="details-image"
              />

              <div className="details-info">
                <p>
                  <span>Ready in</span>
                  {selectedRecipe.readyInMinutes} minutes
                </p>

                <p>
                  <span>Servings</span>
                  {selectedRecipe.servings}
                </p>
              </div>

              <h3>Ingredients</h3>

              <ul className="ingredients-list">
                {selectedRecipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>

              <h3>Instructions</h3>

              <p className="instructions">
                {selectedRecipe.instructions ||
                  "No instructions were found for this recipe."}
              </p>

              <button onClick={cookRecipe}>Cook Recipe</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;