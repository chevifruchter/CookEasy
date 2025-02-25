// import React, { useReducer } from "react";
// import { Card, Typography, Grid, Box, Button } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom"; // בשביל הניווט
// import cakeImg from '../images/alex-munsell-auIbTAcSH6E-unsplash (2).jpg';
// import Pasta from '../images/צילום מסך 2025-02-24 160417.png';
// import { yellow } from "@mui/material/colors";

// //import "../Designs/SiginIn.css"; // עיצוב מותאם אישית

// // מערך המתכונים
// const recipesData = [
//   {
//     Id: 1,
//     Name: "Chocolate Cake",
//     Instructions: [{ Name: "Mix ingredients, bake for 30 min" }],
//     Difficulty: "medium",
//     Duration: 60,
//     Img: cakeImg,
//     Ingridents: [
//       { Name: "Flour", Count: 2, Type: "Cups" },
//       { Name: "Sugar", Count: 1, Type: "Cup" },
//     ],
//     UserId: 101,
//     CategoryId: 5,
//     Description: "A delicious chocolate cake recipe.",
//   },
//   {
//     Id: 2,
//     Name: "Pasta Carbonara",
//     Instructions: [{ Name: "Cook pasta, mix with sauce, cook the cream together with the eggs" }],
//     Difficulty: "low",
//     Duration: 30,
//     Img: Pasta,
//     Ingridents: [
//       { Name: "Pasta", Count: 1, Type: "Pack" },
//       { Name: "Eggs", Count: 2, Type: "Pieces" },
//     ],
//     UserId: 102,
//     CategoryId: 3,
//     Description: "Classic Italian pasta dish.",
//   },
// ];

// // Reducer
// const initialState = { recipes: recipesData };
// const recipeReducer = (state: any, action: any): any => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

// // עיצוב הכרטיסים
// const StyledCard = styled(Card)(() => ({
//   backgroundColor: "white",
//   color: "black",
//   padding: "20px",
//   borderRadius: "16px",
//   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//   textAlign: "center",
//   width: "100%",
//   height: "100%",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: "20px",
// }));

// // עיצוב התמונה
// const StyledImg = styled("img")({
//   width: "100%",
//   maxHeight: "300px",
//   objectFit: "cover",
//   borderRadius: "12px",
// });

// // עיצוב הכותרת
// const StyledTypography = styled(Typography)(() => ({
//   color: "#f50380",
//   fontWeight: "bold",
//   fontSize: "26px",
// }));

// const PageContainer = styled(Box)(() => ({
//   backgroundColor: "#f9f9f9",
//   minHeight: "100vh",
//   padding: "40px 0",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   width: "100%",
// }));

// // כפתורים
// const ButtonContainer = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   width: "100%",
//   marginTop: "20px",
// }));

// // כפתור הוספת מתכון
// const AddRecipeButton = styled(Button)(() => ({
//   position: "absolute",
//   top: "20px",
//   right: "200px",
//   backgroundColor: "#f50380",
//   color: "white",
//   fontSize: "12px",
//  // padding: "4px 8px",
//   //minWidth: "40px", // מגדיר רוחב מינימלי
//   height: "45px", // גובה קבוע
//   width: "100px", // קובע בדיוק את הרוחב כדי שלא יגדל
//   borderRadius: "50px", // הופך אותו לעגול
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   textTransform: "none", // מונע אותיות גדולות אוטומטית
//   "&:hover": {
//     backgroundColor:"#1E88E5",
//     color:"white"
//   },
// }));

// // בתוך ה-PageContainer:

// const AllRecipes = () => {
//   const [state] = useReducer(recipeReducer, initialState);
//   const navigate = useNavigate(); // לשימוש בניווט

// <AddRecipeButton onClick={() => navigate("/AddRecipe")}>➕</AddRecipeButton>

//   return (
//     <PageContainer>
//       {/* כפתור הוספת מתכון */}
//       <AddRecipeButton onClick={() => navigate("/AddRecipe")}>➕ Add Recipe</AddRecipeButton>

//       <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: "100%" }}>
//         {state.recipes.map((recipe: any) => (
//           <Grid item key={recipe.Id} xs={12} sm={6} md={4} lg={4}>
//             <StyledCard>
//               <StyledTypography>{recipe.Name}</StyledTypography>
//               <StyledImg src={recipe.Img} alt={recipe.Name} />
//               <Typography variant="body1" sx={{ margin: "10px 0" }}>
//                 {recipe.Description}
//               </Typography>
//               <Typography>⏳ {recipe.Duration} min | 🔥 {recipe.Difficulty}</Typography>
//               <Typography variant="h6" sx={{ marginTop: "10px", fontWeight: "bold", color: "#f50380" }}>
//                 Ingredients:
//               </Typography>
//               {recipe.Ingridents.map((ing: any, index: number) => (
//                 <Typography key={index}>
//                   {ing.Count} {ing.Type} {ing.Name}
//                 </Typography>
//               ))}
//               <Typography variant="h6" sx={{ marginTop: "10px", fontWeight: "bold", color: "#f50380" }}>
//                 Instructions:
//               </Typography>
//               {recipe.Instructions.map((inst: any, index: number) => (
//                 <Typography key={index}>
//                   {index + 1}. {inst.Name}
//                 </Typography>
//               ))}
//               <ButtonContainer>
//                 <Button variant="contained" color="primary" size="small">
//                   Update
//                 </Button>
//                 <Button variant="outlined" color="secondary" size="small">
//                   Delete
//                 </Button>
//               </ButtonContainer>
//             </StyledCard>
//           </Grid>
//         ))}
//       </Grid>
//     </PageContainer>
//   );
// };

// export default AllRecipes;
//מתכונים מהשרת
import React, { useReducer, useEffect, useContext } from "react";
import { Card, Typography, Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom"; // בשביל הניווט
import axios from 'axios'; // ייבוא axios
import { userContext } from "../userContext";

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
  // minHeight: "50px", // גובה קבוע
  marginBottom: "20px",
  overflow: "auto", // בגלילה בתוכן ארוך
  position: "relative",
}));

// עיצוב התמונה
const StyledImg = styled("img")({
  width: "100%",
  maxHeight: "250px", // שינוי גובה התמונה כדי להשאיר מקום לתוכן
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "15px", // יצירת מרווח בין התמונה לתוכן
});

// עיצוב הכותרת
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

// כפתורים
const ButtonContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "200px",
  marginTop: "20px",
}));

// כפתור הוספת מתכון
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

  // alert(MyUser)

  if (MyUser)
    header = true;

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
        if (header)
          navigate("/AddRecipe")
      }}>➕ Add Recipe
      </AddRecipeButton>

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
                  <Button variant="contained" color="primary" size="small">
                    Update
                  </Button>
                  <Button variant="outlined" color="secondary" size="small">
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