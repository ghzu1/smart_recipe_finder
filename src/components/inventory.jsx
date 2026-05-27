import { useState } from "react";

function Inventory({ inventory, setInventory }) {
  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState("");

  function addIngredient(e) {
    e.preventDefault();

    if (ingredientName === "" || amount === "") {
      return;
    }

    const newIngredient = {
      name: ingredientName,
      amount: Number(amount),
    };

    const updatedInventory = [...inventory, newIngredient];

    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));

    setIngredientName("");
    setAmount("");
  }

  return (
    <div>
      <h2>Kitchen Inventory</h2>

      <form onSubmit={addIngredient}>
        <input
          type="text"
          placeholder="Ingredient, e.g. egg"
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      <ul>
        {inventory.map((item, index) => (
          <li key={index}>
            {item.name} - {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;