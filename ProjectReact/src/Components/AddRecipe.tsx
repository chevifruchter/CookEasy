// import React, { useState } from "react";
// import { Card, Typography, Grid, Box, TextField, Button } from "@mui/material";
// import { styled } from "@mui/system";

// // עיצוב הכרטיס
// const StyledCard = styled(Card)(() => ({
//   backgroundColor: "white",
//   color: "black",
//   padding: "30px",
//   borderRadius: "16px",
//   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//   textAlign: "center",
//   width: "100%",
//   maxWidth: "600px",
//   margin: "0 auto",
// }));

// // עיצוב התמונה
// const StyledImg = styled("img")({
//   width: "100%",
//   maxHeight: "250px",
//   objectFit: "cover",
//   borderRadius: "12px",
// });

// // עיצוב הכותרת
// const StyledTypography = styled(Typography)(() => ({
//   color: "#f50380",
//   fontWeight: "bold",
//   fontSize: "26px",
//   marginBottom: "20px",
// }));

// const PageContainer = styled(Box)(() => ({
//   backgroundColor: "#f9f9f9",
//   minHeight: "100vh",
//   padding: "40px 0",
//   display: "flex",
//   justifyContent: "center",
// }));

// // עיצוב כפתור שמירה
// const SaveButton = styled(Button)(() => ({
//   position: "absolute",
//   top: "20px",
//   right: "20px",
//   padding: "10px 20px",
//   backgroundColor: "#f50380",
//   color: "white",
//   fontWeight: "bold",
//   borderRadius: "8px",
//   '&:hover': {
//     backgroundColor: "#d0006d",
//   },
// }));

// const AddRecipe = () => {
//   const [recipe, setRecipe] = useState({
//     name: "",
//     description: "",
//     ingredients: [{ name: "", count: "", type: "" }],
//     instructions: [{ step: "" }],
//     difficulty: "",
//     duration: "",
//     img: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setRecipe({
//       ...recipe,
//       [name]: value,
//     });
//   };

//   const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const newIngredients = [...recipe.ingredients];  // ביצוע העתקה כדי לא לשנות ישירות את המערך
//     newIngredients[index] = { ...newIngredients[index], [name]: value }; // עדכון השדה הספציפי באובייקט
//     setRecipe({
//       ...recipe,
//       ingredients: newIngredients,
//     });
//   };
  

//   const handleInstructionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//     const newInstructions = [...recipe.instructions];
//     newInstructions[index].step = e.target.value;
//     setRecipe({
//       ...recipe,
//       instructions: newInstructions,
//     });
//   };

//   const handleAddIngredient = () => {
//     setRecipe({
//       ...recipe,
//       ingredients: [...recipe.ingredients, { name: "", count: "", type: "" }],
//     });
//   };

//   const handleAddInstruction = () => {
//     setRecipe({
//       ...recipe,
//       instructions: [...recipe.instructions, { step: "" }],
//     });
//   };

//   const handleSubmit = () => {
//     // כאן תוכל לשלוח את הנתונים לשרת או לעבד אותם
//     console.log("New Recipe Submitted", recipe);
//   };

//   return (
//     <PageContainer>
//       <StyledCard>
//         <StyledTypography>Add New Recipe</StyledTypography>

//         <TextField
//           label="Recipe Name"
//           name="name"
//           value={recipe.name}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={recipe.description}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Difficulty"
//           name="difficulty"
//           value={recipe.difficulty}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Duration (minutes)"
//           name="duration"
//           type="number"
//           value={recipe.duration}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Image URL"
//           name="img"
//           value={recipe.img}
//           onChange={handleInputChange}
//           fullWidth
//           margin="normal"
//         />

//         <Typography variant="h6" sx={{ marginTop: "20px", fontWeight: "bold", color: "#f50380" }}>
//           Ingredients:
//         </Typography>
//         {recipe.ingredients.map((ingredient, index) => (
//           <Grid container key={index} spacing={2} sx={{ marginBottom: "10px" }}>
//             <Grid item xs={4}>
//               <TextField
//                 label="Ingredient Name"
//                 name="name"
//                 value={ingredient.name}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 label="Count"
//                 name="count"
//                 type="number"
//                 value={ingredient.count}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={4}>
//               <TextField
//                 label="Unit"
//                 name="type"
//                 value={ingredient.type}
//                 onChange={(e) => handleIngredientChange(index, e)}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>
//         ))}
//         <Button variant="outlined" onClick={handleAddIngredient} sx={{ marginBottom: "20px" }}>
//           Add Ingredient
//         </Button>

//         <Typography variant="h6" sx={{ marginTop: "20px", fontWeight: "bold", color: "#f50380" }}>
//           Instructions:
//         </Typography>
//         {recipe.instructions.map((instruction, index) => (
//           <Grid container key={index} spacing={2} sx={{ marginBottom: "10px" }}>
//             <Grid item xs={12}>
//               <TextField
//                 label={`Step ${index + 1}`}
//                 name="step"
//                 value={instruction.step}
//                 onChange={(e) => handleInstructionChange(index, e)}
//                 fullWidth
//                 multiline
//                 rows={4}
//               />
//             </Grid>
//           </Grid>
//         ))}
//         <Button variant="outlined" onClick={handleAddInstruction} sx={{ marginBottom: "20px" }}>
//           Add Instruction
//         </Button>

//         <SaveButton onClick={handleSubmit}>
//           Save Recipe
//         </SaveButton>
//       </StyledCard>
//     </PageContainer>
//   );
// };

// export default AddRecipe;
import React, { useState } from "react";
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

  const handleSave = () => {
    console.log("Recipe saved", recipe);
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