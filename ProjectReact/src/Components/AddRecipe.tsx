
import axios from "axios";
import React, { useState } from "react";
import  { Recipe, RecipeToAdd } from "../Repositories/Types";
const AddRecipeForm = () => {
  const [recipe, setRecipe] = useState<RecipeToAdd>({
    Name: "",
    Img: "",
    UserId: "1",
    Categoryid: 1,
    Duration: 0,
    Difficulty: 0,
    Description: "",
    Ingridents: [{ Name: "", Count: 0, Type: "" }],
    Instructions: [{ Name: "" }]
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
    const newIngredients = [...recipe.Ingridents];
    newIngredients[index] = { ...newIngredients[index], [e.target.name]: e.target.value };
    setRecipe({
      ...recipe,
      Ingridents: newIngredients,
    });
  };


  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      Ingridents: [...recipe.Ingridents, { Name: "", Count: 0, Type: "" }],
    });
  };

  const handleAddInstruction = () => {
    setRecipe({
      ...recipe,
      Instructions: [...recipe.Instructions, { Name: "" }],
    });
  };

  const handleDeleteIngredient = () => {
    const newIngredients = [...recipe.Ingridents];
    const lastIngredient: number = newIngredients.length - 1;
    newIngredients.splice(lastIngredient, 1);
    setRecipe({
      ...recipe,
      Ingridents: newIngredients,
    });
  };

  const handleSave = async () => {

    console.log("handleSave called", recipe);

    try {
      console.log("Sending to server:", recipe);
      await axios.post<Recipe>("http://localhost:8080/api/recipe", recipe);
      console.log("✅ Saved:");
    } catch (error) {
      console.error("❌ Error adding recipe:", error);
    }

  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", height: "100vh", overflow: "auto" }}>
      {/* כותרת */}
      <h1 style={{ textAlign: "center", marginBottom: "20px", position: "sticky", top: "0", backgroundColor: "white", zIndex: 1 }}>הוספת מתכון</h1>
      <div
        className="form-container"
        style={{
          flex: 1, 
          overflowY: "auto", 
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        {/* URL של תמונה */}
        <div className="input-group" style={{ marginBottom: "15px" }}>
          <label>Image URL</label>
          <input
            type="text"
            value={recipe.Img}
            onChange={(e) => handleInputChange(e, "Img")}
            placeholder="Enter image URL"
            style={{ width: "100%", padding: "10px", fontSize: "16px" }}
          />
        </div>

        {/* תצוגת תמונה */}
        {recipe.Img && (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <img
              src={recipe.Img}
              alt="Recipe"
              style={{ maxWidth: "100%", maxHeight: "300px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
        )}
        {/* שם המתכון */}
        <div className="input-group">
          <label>Recipe Name</label>
          <input
            type="text"
            value={recipe.Name}
            onChange={(e) => handleInputChange(e, "Name")}
            placeholder="Enter recipe name"
          />
        </div>

        {/* תיאור */}
        <div className="input-group">
          <label>Description</label>
          <input
            type="text"
            value={recipe.Description}
            onChange={(e) => handleInputChange(e, "Description")}
            placeholder="Enter recipe description"
          />
        </div>

        {/* רכיבים */}
        <div className="ingredients-section">
          <label>Ingredients</label>
          {recipe.Ingridents.map((i, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit (e.g. grams)"
                onChange={(e) => handleIngredientChange(index, e)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
          <button type="button" onClick={() => handleDeleteIngredient}>Delate Ingredient</button>
        </div>

        {/* זמן הכנה */}
        <div className="input-group">
          <label>Duration (mins)</label>
          <input
            type="number"
            value={recipe.Duration}
            onChange={(e) => handleInputChange(e, "Duration")}
            placeholder="Enter preparation time"
          />
        </div>

        {/* דרגת קושי */}
        <div className="input-group">
          <label>Difficulty</label>
          <select
            value={recipe.Difficulty}
            onChange={(e: any) => handleInputChange(e, "Difficulty")}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {/* בחירת קטגוריה*/}
        <div className="input-group">
          <label>Category</label>
          <select
            value={recipe.Categoryid}
            onChange={(e: any) => handleInputChange(e, "Categoryid")}
          >
            <option value="">Select Category</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        {/* אופן ההכנה */}
        <div className="instructions-section">
          <label>Instructions</label>
          {recipe.Instructions.map((instruction, index) => (
            <div key={index} className="instruction-group">
              <input
                type="text"
                name="step"
                placeholder="Step Description"
                value={instruction.Name}
                onChange={(e) => {
                  const newInstructions = [...recipe.Instructions];
                  newInstructions[index].Name = e.target.value;
                  setRecipe({ ...recipe, Instructions: newInstructions });
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

      </div>
    </div>
  );
};

export default AddRecipeForm;