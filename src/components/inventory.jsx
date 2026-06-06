import { useState } from "react";

function Inventory({ inventory, setInventory }) {
  const [ingredientName, setIngredientName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("pcs");

  function addIngredient(e) {
    e.preventDefault();

    const name = ingredientName.trim();
    const ingredientAmount = Number(amount);

    if (name === "" || ingredientAmount <= 0) {
      return;
    }

    const existingIngredient = inventory.find(
      (item) =>
        item.name.toLowerCase() === name.toLowerCase() && item.unit === unit
    );

    let updatedInventory;

    if (existingIngredient) {
      updatedInventory = inventory.map((item) => {
        if (
          item.name.toLowerCase() === name.toLowerCase() &&
          item.unit === unit
        ) {
          return {
            ...item,
            amount: item.amount + ingredientAmount,
          };
        }

        return item;
      });
    } else {
      const newIngredient = {
        name: name,
        amount: ingredientAmount,
        unit: unit,
      };

      updatedInventory = [...inventory, newIngredient];
    }

    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));

    setIngredientName("");
    setAmount("");
    setUnit("pcs");
  }

  function removeIngredient(index) {
    const updatedInventory = inventory.filter((_, i) => i !== index);

    setInventory(updatedInventory);
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
  }

  return (
    <section className="inventory-section" id="inventory">
      <h2>Kitchen Inventory</h2>

      <form className="inventory-form" onSubmit={addIngredient}>
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
          min="1"
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="pcs">pcs</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="ml">ml</option>
          <option value="l">l</option>
          <option value="tsp">tsp</option>
          <option value="tbsp">tbsp</option>
        </select>

        <button type="submit">Add</button>
      </form>

      {inventory.length === 0 ? (
        <p className="empty-state">Add ingredients you already have at home.</p>
      ) : (
        <div className="inventory-container">
          {inventory.map((item, index) => (
            <div className="inventory-card" key={index}>
              <h3>{item.name}</h3>
              <p>
                Amount: {item.amount} {item.unit || "pcs"}
              </p>
              <button onClick={() => removeIngredient(index)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Inventory;