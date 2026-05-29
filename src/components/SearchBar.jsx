import { useState } from "react";
import { searchRecipes } from "../services/recipeService";

function SearchBar({ setRecipes, onSearch }) {
  const [searchText, setSearchText] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (onSearch){
      onSearch(searchText)
    }else{
     const recipes = await searchRecipes(searchText);
     setRecipes(recipes);
  }
}
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;