import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div>
      <Navbar />

      <h1>Welcome to Smart Recipe Finder</h1>

      <SearchBar setRecipes={setRecipes} />

      <h2>Search Results</h2>

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <h3>{recipe.title}</h3>
            <button onClick={() => addToFavorites(recipe)}>❤️ Favorite</button>
          </div>
        ))}
      </div>

      <h2>Favorites</h2>

      <div className="recipe-container">
        {favorites.map((recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <img src={recipe.image} alt={recipe.title} width="200" />
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;