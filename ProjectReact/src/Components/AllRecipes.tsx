// //מתכונים מהשרת
// import React, { useReducer, useEffect, useContext } from "react";
// import { Card, Typography, Grid, Box, Button } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom"; // בשביל הניווט
// import axios from 'axios'; // ייבוא axios
// import { userContext } from "../userContext";

// // 🔹 קבלת כל המתכונים (GET)
// export const getAllRecipes = async () => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/recipe`);
//         return response.data;
//     } catch (error) {
//         console.error("❌ Error fetching recipes:", error);
//         throw error;
//     }
// };

// // 🔹 קבלת מתכון לפי ID (GET)
// export const getRecipeById = async (recipeId: number) => {
//     try {
//         const response = await axios.get(`http://localhost:8080/api/recipe/${recipeId}`);
//         return response.data;
//     } catch (error) {
//         console.error(`❌ Error fetching recipe with ID ${recipeId}:`, error);
//         throw error;
//     }
// };

// // 🔹 הוספת מתכון חדש (POST)
// export const addRecipe = async (recipe: { name: string; ingredients: string; instructions: string; userId: number }) => {
//     try {
//         const response = await axios.post(`http://localhost:8080/api/recipe/add`, recipe);
//         return response.data;
//     } catch (error) {
//         console.error("❌ Error adding recipe:", error);
//         throw error;
//     }
// };

// // 🔹 עדכון מתכון קיים (PUT)
// export const updateRecipe = async (recipeId: number, updatedData: { name?: string; ingredients?: string; instructions?: string }) => {
//     try {
//         const response = await axios.put(`http://localhost:8080/api/recipe/update/${recipeId}`, updatedData);
//         return response.data;
//     } catch (error) {
//         console.error(`❌ Error updating recipe with ID ${recipeId}:`, error);
//         throw error;
//     }
// };

// // 🔹 מחיקת מתכון (DELETE)
// export const deleteRecipe = async (recipeId: number) => {
//     try {
//         const response = await axios.delete(`http://localhost:8080/api/recipe/delete/${recipeId}`);
//         return response.data;
//     } catch (error) {
//         console.error(`❌ Error deleting recipe with ID ${recipeId}:`, error);
//         throw error;
//     }
// };

// // Reducer
// const initialState = { recipes: [], loading: true, error: null };

// const recipeReducer = (state: any, action: any): any => {
//   switch (action.type) {
//     case "SET_RECIPES":
//       return { ...state, recipes: action.payload, loading: false };
//     case "SET_LOADING":
//       return { ...state, loading: true };
//     case "SET_ERROR":
//       return { ...state, error: action.payload, loading: false };
//     default:
//       return state;
//   }
// };

// const StyledCard = styled(Card)(() => ({
//   backgroundColor: "white",
//   color: "black",
//   padding: "200px", // הגדר padding סביר שייתן מקום לכל התוכן
//   borderRadius: "16px",
//   boxShadow: "0px -4px 15px rgba(0, 0, 0, 0.2)", // box-shadow למעלה
//   textAlign: "center",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "flex-start",
//   alignItems: "center",
//   // minHeight: "50px", // גובה קבוע
//   marginBottom: "20px",
//   overflow: "auto", // בגלילה בתוכן ארוך
//   position: "relative",
// }));

// // עיצוב התמונה
// const StyledImg = styled("img")({
//   width: "100%",
//   maxHeight: "250px", // שינוי גובה התמונה כדי להשאיר מקום לתוכן
//   objectFit: "cover",
//   borderRadius: "12px",
//   marginBottom: "15px", // יצירת מרווח בין התמונה לתוכן
// });

// // עיצוב הכותרת
// const StyledTypography = styled(Typography)(() => ({
//   color: "#f50380",
//   fontWeight: "bold",
//   fontSize: "24px", // שינוי גודל הטקסט
//   marginBottom: "10px", // מרווח בין הכותרת לשאר התוכן
// }));

// const PageContainer = styled(Box)(() => ({
//   backgroundColor: "#f9f9f9",
//   minHeight: "100vh",
//   padding: "40px ",
//   display: "flex",
//   flexDirection: "row",
//   alignItems: "center",
//   width: "1000",
// }));

// // כפתורים
// const ButtonContainer = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   width: "200px",
//   marginTop: "20px",
// }));

// // כפתור הוספת מתכון
// const AddRecipeButton = styled(Button)(() => ({
//   position: "absolute",
//   top: "40px",
//   right: "240px",
//   backgroundColor: "#f50380",
//   color: "white",
//   fontSize: "12px",
//   height: "45px",
//   width: "100px",
//   borderRadius: "50px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   textTransform: "none",
//   "&:hover": {
//     backgroundColor: "#1E88E5",
//     color: "white",
//   },
// }));

// const AllRecipes = () => {
//   const [state, dispatch] = useReducer(recipeReducer, initialState);
//   const navigate = useNavigate(); // לשימוש בניווט
//   const { MyUser } = useContext(userContext);
//   let header: boolean = false;

//   if (MyUser)
//     header = true;

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       dispatch({ type: "SET_LOADING" });
//       try {
//         const response = await axios.get("http://localhost:8080/api/recipe");
//         dispatch({ type: "SET_RECIPES", payload: response.data });
//       } catch (error) {
//         dispatch({ type: "SET_ERROR", payload: "Failed to fetch recipes" });
//         console.error(error);
//       }
//     };
//     fetchRecipes();
//   }, []);

//   return (
//     <PageContainer>
//       {/* כפתור הוספת מתכון */}
//       <AddRecipeButton onClick={() => {
//         if (header)
//           navigate("/AddRecipe")
//       }}>➕ Add Recipe
//       </AddRecipeButton>

//       {state.loading ? (
//         <Typography>Loading...</Typography>
//       ) : state.error ? (
//         <Typography color="error">{state.error}</Typography>
//       ) : (
//         <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: "100%" }}>
//           {state.recipes.map((recipe: any) => (
//             <Grid item key={recipe.Id} xs={12} sm={6} md={4} lg={4}>
//               <StyledCard>
//                 <StyledTypography>{recipe.Name}</StyledTypography>
//                 <StyledImg src={recipe.Img} alt={recipe.Name} />
//                 <Typography variant="body1" sx={{ marginBottom: "15px" }}>
//                   {recipe.Description}
//                 </Typography>
//                 <Typography sx={{ marginBottom: "15px", display: 'inline' }}>
//                   ⏳ {recipe.Duration} min | 🔥 {recipe.Difficulty}
//                 </Typography>


//                 <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f50380" }}>
//                   Ingredients:
//                 </Typography>
//                 {recipe.Ingridents.map((ing: any, index: number) => (
//                   <Typography key={index}>
//                     {ing.Count} {ing.Type} {ing.Name}
//                   </Typography>
//                 ))}

//                 <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f50380", marginTop: "15px" }}>
//                   Instructions:
//                 </Typography>
//                 {recipe.Instructions.map((inst: any, index: number) => (
//                   <Typography key={index}>
//                     {index + 1}. {inst.Name}
//                   </Typography>
//                 ))}
//                 <ButtonContainer>
//                   <Button variant="contained" color="primary" size="small">
//                     Update
//                   </Button>
//                   <Button variant="outlined" color="secondary" size="small">
//                     Delete
//                   </Button>
//                 </ButtonContainer>
//               </StyledCard>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </PageContainer>
//   );
// };

// export default AllRecipes;


import React, { useReducer, useEffect, useContext } from "react";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom"; // בשביל הניווט
import axios from 'axios'; // ייבוא axios
import { userContext } from "../userContext";

// 🔹 קבלת כל המתכונים (GET)
export const getAllRecipes = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/recipe`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching recipes:", error);
        throw error;
    }
};

// 🔹 קבלת מתכון לפי ID (GET)
export const getRecipeById = async (recipeId: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/recipe/${recipeId}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error fetching recipe with ID ${recipeId}:`, error);
        throw error;
    }
};

// 🔹 הוספת מתכון חדש (POST)
export const addRecipe = async (recipe: { name: string; ingredients: string; instructions: string; userId: number }) => {
    try {
        const response = await axios.post(`http://localhost:8080/api/recipe/add`, recipe);
        return response.data;
    } catch (error) {
        console.error("❌ Error adding recipe:", error);
        throw error;
    }
};

// 🔹 עדכון מתכון קיים (PUT)
export const updateRecipe = async (recipeId: number, updatedData: { name?: string; ingredients?: string; instructions?: string }) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/recipe/update/${recipeId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error(`❌ Error updating recipe with ID ${recipeId}:`, error);
        throw error;
    }
};

// 🔹 מחיקת מתכון (DELETE)
export const deleteRecipe = async (recipeId: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/recipe/delete/${recipeId}`);
        return response.data;
    } catch (error) {
        console.error(`❌ Error deleting recipe with ID ${recipeId}:`, error);
        throw error;
    }
};

// Reducer
const initialState = { recipes: [], loading: true, error: null };

const recipeReducer = (state: any, action: any): any => {
  switch (action.type) {
    case "SET_RECIPES":
      return { ...state, recipes: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const StyledCard = styled(Card)(() => ({
  backgroundColor: "white",
  color: "black",
  padding: "200px", // הגדר padding סביר שייתן מקום לכל התוכן
  borderRadius: "16px",
  boxShadow: "0px -4px 15px rgba(0, 0, 0, 0.2)", // box-shadow למעלה
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "20px",
  overflow: "auto", // בגלילה בתוכן ארוך
  position: "relative",
}));

const StyledImg = styled("img")({
  width: "100%",
  maxHeight: "250px", // שינוי גובה התמונה כדי להשאיר מקום לתוכן
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "15px", // יצירת מרווח בין התמונה לתוכן
});

const StyledTypography = styled(Typography)(() => ({
  color: "#f50380",
  fontWeight: "bold",
  fontSize: "24px", // שינוי גודל הטקסט
  marginBottom: "10px", // מרווח בין הכותרת לשאר התוכן
}));

const PageContainer = styled(Box)(() => ({
  backgroundColor: "#f9f9f9",
  minHeight: "100vh",
  padding: "40px ",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "1000",
}));

const ButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "200px",
  marginTop: "20px",
}));

const AddRecipeButton = styled(Button)(() => ({
  position: "absolute",
  top: "40px",
  right: "240px",
  backgroundColor: "#f50380",
  color: "white",
  fontSize: "12px",
  height: "45px",
  width: "100px",
  borderRadius: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#1E88E5",
    color: "white",
  },
}));

const AllRecipes = () => {
  const [state, dispatch] = useReducer(recipeReducer, initialState);
  const navigate = useNavigate(); // לשימוש בניווט
  const { MyUser } = useContext(userContext);
  let header: boolean = false;

  if (MyUser) header = true;

  const isUserOwner = (recipe: any) => {
    return recipe.UserId === MyUser?.Id; // בודק אם המשתמש הנוכחי יצר את המתכון
  };

  const handleUpdateRecipe = async (recipe: any) => {
    if (!isUserOwner(recipe)) {
        alert("You do not have permission to update this recipe.");
        return; // אם המשתמש לא יצר את המתכון, נעצור את הפעולה
    }
    try {
        const updatedData = {
            name: "Updated Recipe Name", // לדוגמה
            ingredients: "Updated Ingredients list", // לדוגמה
            instructions: "Updated Instructions", // לדוגמה
        };
        const updatedRecipe = await updateRecipe(recipe.Id, updatedData); // קריאה לפונקציה שמבצעת את העדכון
        dispatch({ type: "SET_RECIPES", payload: state.recipes.map((r: any) => r.Id === recipe.Id ? updatedRecipe : r) });
        navigate(`/recipe/${recipe.Id}`); // ניווט לדף המתכון לאחר העדכון
    } catch (error) {
        alert("Failed to update recipe.");
    }
  };

  const handleDeleteRecipe = async (recipe: any) => {
    if (!isUserOwner(recipe)) {
        alert("You do not have permission to delete this recipe.");
        return; // אם המשתמש לא יצר את המתכון, נעצור את הפעולה
    }
    try {
        await deleteRecipe(recipe.Id); // קריאה לפונקציה שמבצעת את המחיקה
        dispatch({ type: "SET_RECIPES", payload: state.recipes.filter((r: any) => r.Id !== recipe.Id) });
        navigate("/AllRecipes"); // ניווט חזרה לדף המתכונים
    } catch (error) {
        alert("Failed to delete recipe.");
    }
  };

  const handleAddRecipe = async () => {
    try {
        const newRecipe = {
            name: "New Recipe Name",
            ingredients: "Ingredients list",
            instructions: "Cooking instructions",
            userId: MyUser?.Id, // לוודא שאתה שולח את מזהה המשתמש
        };
        const addedRecipe = await addRecipe(newRecipe); // קריאה לפונקציה שמבצעת את ההוספה
        dispatch({ type: "SET_RECIPES", payload: [...state.recipes, addedRecipe] });
        navigate("/AllRecipes"); // ניווט לדף המתכונים
    } catch (error) {
        alert("Failed to add recipe.");
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await axios.get("http://localhost:8080/api/recipe");
        dispatch({ type: "SET_RECIPES", payload: response.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch recipes" });
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <PageContainer>
      {/* כפתור הוספת מתכון */}
      <AddRecipeButton onClick={() => {
        if (header) navigate("/AddRecipe");
      }}>➕ Add Recipe</AddRecipeButton>

      {state.loading ? (
        <Typography>Loading...</Typography>
      ) : state.error ? (
        <Typography color="error">{state.error}</Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: "100%" }}>
          {state.recipes.map((recipe: any) => (
            <Grid item key={recipe.Id} xs={12} sm={6} md={4} lg={4}>
              <StyledCard>
                <StyledTypography>{recipe.Name}</StyledTypography>
                <StyledImg src={recipe.Img} alt={recipe.Name} />
                <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                  {recipe.Description}
                </Typography>
                <Typography sx={{ marginBottom: "15px", display: 'inline' }}>
                  ⏳ {recipe.Duration} min | 🔥 {recipe.Difficulty}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f50380" }}>
                  Ingredients:
                </Typography>
                {recipe.Ingridents.map((ing: any, index: number) => (
                  <Typography key={index}>
                    {ing.Count} {ing.Type} {ing.Name}
                  </Typography>
                ))}

                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#f50380", marginTop: "15px" }}>
                  Instructions:
                </Typography>
                {recipe.Instructions.map((inst: any, index: number) => (
                  <Typography key={index}>
                    {index + 1}. {inst.Name}
                  </Typography>
                ))}
                
                <ButtonContainer>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="small" 
                    onClick={() => { if (header) handleUpdateRecipe(recipe)}} // עדכון המתכון
                  >
                    Update
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    size="small" 
                    onClick={() => { if (header) handleDeleteRecipe(recipe)}} // מחיקת המתכון
                  >
                    Delete
                  </Button>
                </ButtonContainer>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default AllRecipes;

