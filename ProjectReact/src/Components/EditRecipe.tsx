import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import RecipeStore from "../stores/MobxRec";
import { useParams } from "react-router-dom";


const EditRecipeForm = () => {
  const { id } = useParams<{ id: string }>();
  const currId = Number(id);
  console.log("Editing recipe with ID:", currId);

  useEffect(() => {
    RecipeStore.fetchRecipe(currId);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    RecipeStore.updateField(field, e.target.value);
  };

  const handleAddIngredient = () => {
    RecipeStore.updateField("Ingridents", [
      ...(RecipeStore.currRecipe?.Ingridents || []),
      { Name: "", Count: "", Type: "" },
    ]);
  };

  const handleAddInstruction = () => {
    RecipeStore.updateField("Instructions", [
      ...(RecipeStore.currRecipe?.Instructions || []),
      { Name: "" },
    ]);
  };

  const handleSave = async () => {
    console.log("handleSave called");
    await RecipeStore.updateRecipe();
    setTimeout(() => RecipeStore.clearSuccessMessage(), 3000); // העלמת ההודעה אחרי 3 שניות
    console.log("Recipe object before sending:", RecipeStore.currRecipe); // כאן תראה מה נשלח
    
  };

  if (RecipeStore.isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", height: "100vh", overflow: "auto" }}>
    {/* כותרת */}
    <h1 style={{ textAlign: "center", marginBottom: "20px", position: "sticky", top: "0", backgroundColor: "white", zIndex: 1 }}>עדכון מתכון</h1>

      {/* מיכל עם גלילה אנכית */}
      <div
        className="form-container"
        style={{
          flex: 1, // מאפשר למיכל לתפוס את כל הגובה הזמין
          overflowY: "auto", // גלילה אנכית
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
    <div className="form-container">
      {RecipeStore.successMessage && <p className="success-message">{RecipeStore.successMessage}</p>}

      <form onSubmit={(e) => e.preventDefault()} className="recipe-form">
            {/* תצוגת תמונה */}
            {RecipeStore.currRecipe?.Img && (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <img
              src={RecipeStore.currRecipe?.Img}
              alt="Recipe"
              style={{ maxWidth: "100%", maxHeight: "300px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
          </div>
        )}
        <div className="input-group">
          <label>Recipe Name</label>
          <input
            type="text"
            value={RecipeStore.currRecipe?.Name || ""}
            onChange={(e) => handleInputChange(e, "Name")}
            placeholder="Enter recipe name"
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <input
            type="text"
            value={RecipeStore.currRecipe?.Description || ""}
            onChange={(e) => handleInputChange(e, "Description")}
            placeholder="Enter recipe description"
          />
        </div>
         {/* רכיבים */}
         <div className="ingredients-section">
          <label>Ingredients</label>
          {RecipeStore.currRecipe?.Ingridents.map((i, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                value={RecipeStore.currRecipe?.Ingridents[index].Name || ""}
                placeholder="Ingredient Name"
                onChange={(e) => handleInputChange(e, "Ingridents[index].Name")}
                // onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                onChange={(e) => handleInputChange(e, "Ingridents[index].Count")}
                 value={RecipeStore.currRecipe?.Ingridents[index].Count || ""}
                // onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit (e.g. grams)"
                value={RecipeStore.currRecipe?.Ingridents[index].Type || ""}
                onChange={(e) => handleInputChange(e, "Ingridents[index].Type")}
                // onChange={(e) => handleIngredientChange(index, e)}
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
            value={RecipeStore.currRecipe?.Duration}
            onChange={(e) => handleInputChange(e, "Duration")}
            placeholder="Enter preparation time"
          />
        </div>

        {/* דרגת קושי */}
        <div className="input-group">
          <label>Difficulty</label>
          <select
            value={RecipeStore.currRecipe?.Difficulty}
            onChange={(e:any) => handleInputChange(e, "Difficulty")}
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
            value={RecipeStore.currRecipe?.Categoryid}
            onChange={(e:any) => handleInputChange(e, "Categoryid")}
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
          {RecipeStore.currRecipe?.Instructions.map((instruction, index) => (
            <div key={index} className="instruction-group">
              <input
                type="text"
                name="step"
                placeholder="Step Description"
                value={instruction.Name}
                onChange={(e) => {
                  const newInstructions = [...(RecipeStore.currRecipe?.Instructions || [])];
                  newInstructions[index].Name = e.target.value;
                  // setRecipe({ ...RecipeStore.currRecipe, Instructions: newInstructions });
                }}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddInstruction}>
            Add Instruction
          </button>
        </div>

        {/* כפתור שמירה */}
        <button type="button" onClick={handleSave}>
          Update Recipe
        </button>
      </form>
    </div>
      </div>
    </div>  
  );
};

export default observer(EditRecipeForm);
