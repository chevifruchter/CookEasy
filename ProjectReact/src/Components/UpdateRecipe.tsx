
import axios from "axios";
import React, { useState } from "react";
import { data } from "react-router-dom";
import { recipe } from "../Types";
const AddRecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [{ step: "" }],
    duration: "",
    difficulty: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setRecipe({
      ...recipe,
      [field]: e.target.value,
    });
  };

  const handleIngredientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [e.target.name]: e.target.value };
    setRecipe({
      ...recipe,
      ingredients: newIngredients,
    });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", quantity: "", unit: "" }],
    });
  };

  const handleAddInstruction = () => {
    setRecipe({
      ...recipe,
      instructions: [...recipe.instructions, { step: "" }],
    });
  };

  const  handleSave  = async() => {
    try {
      const response = await axios.post(`http://localhost:8080/api/recipe/AddRecipy`, data);
      return response.data;
  } catch (error) {
      console.error("❌ Error adding recipe:", error);
      throw error;
  }
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => e.preventDefault()} className="recipe-form">
        {/* שם המתכון */}
        <div className="input-group">
          <label>Recipe Name</label>
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => handleInputChange(e, "name")}
            placeholder="Enter recipe name"
          />
        </div>

        {/* תיאור */}
        <div className="input-group">
          <label>Description</label>
          <input
            type="text"
            value={recipe.description}
            onChange={(e) => handleInputChange(e, "description")}
            placeholder="Enter recipe description"
          />
        </div>

        {/* רכיבים */}
        <div className="ingredients-section">
          <label>Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit (e.g. grams)"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        {/* זמן הכנה */}
        <div className="input-group">
          <label>Duration (mins)</label>
          <input
            type="number"
            value={recipe.duration}
            onChange={(e) => handleInputChange(e, "duration")}
            placeholder="Enter preparation time"
          />
        </div>

        {/* דרגת קושי */}
        <div className="input-group">
          <label>Difficulty</label>
          <select
            value={recipe.difficulty}
            onChange={(e:any) => handleInputChange(e, "difficulty")}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* אופן ההכנה */}
        <div className="instructions-section">
          <label>Instructions</label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="instruction-group">
              <input
                type="text"
                name="step"
                placeholder="Step description"
                value={instruction.step}
                onChange={(e) => {
                  const newInstructions = [...recipe.instructions];
                  newInstructions[index].step = e.target.value;
                  setRecipe({ ...recipe, instructions: newInstructions });
                }}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddInstruction}>
            Add Instruction
          </button>
        </div>

        {/* כפתור שמירה */}
        <div className="save-button">
          <button type="button" onClick={handleSave}>
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;