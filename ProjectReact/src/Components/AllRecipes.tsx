import React, { useReducer } from "react";
import { Card, CardContent, Typography, Button, Grid, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// מערך המתכונים
const recipesData = [
  {
    Id: 1,
    Name: "Chocolate Cake",
    Instructions: [{ Name: "Mix ingredients, bake for 30 min" }],
    Difficulty: "medium",
    Duration: 60,
    Img: "https://source.unsplash.com/1600x900/?cake",
    Ingridents: [
      { Name: "Flour", Count: 2, Type: "Cups" },
      { Name: "Sugar", Count: 1, Type: "Cup" },
    ],
    UserId: 101,
    CategoryId: 5,
    Description: "A delicious chocolate cake recipe.",
  },
  {
    Id: 2,
    Name: "Pasta Carbonara",
    Instructions: [{ Name: "Cook pasta, mix with sauce" }],
    Difficulty: "low",
    Duration: 30,
    Img: "https://source.unsplash.com/1600x900/?pasta",
    Ingridents: [
      { Name: "Pasta", Count: 1, Type: "Pack" },
      { Name: "Eggs", Count: 2, Type: "Pieces" },
    ],
    UserId: 102,
    CategoryId: 3,
    Description: "Classic Italian pasta dish.",
  },
];

// הגדרת ה-Reducer
const initialState = { recipes: recipesData };

const recipeReducer = (state: any, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

// עיצוב מותאם אישית עם MUI
const StyledCard = styled(Card)({
  backgroundColor: "#f50380",
  color: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  width: "350px",  // הרחבה של המלבנים
});

const AddRecipeButton = styled(Button)({
  backgroundColor: "#f50380",
  color: "white",
  marginBottom: "20px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#ff1f8b",
  },
});

const AllRecipes = () => {
  const [state] = useReducer(recipeReducer, initialState);

  const handleAddRecipe = () => {
    console.log("Add new recipe");
  };

  const handleEditRecipe = (id: number) => {
    console.log("Edit recipe with id:", id);
  };

  const handleDeleteRecipe = (id: number) => {
    console.log("Delete recipe with id:", id);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <AddRecipeButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddRecipe}
      >
        Add New Recipe
      </AddRecipeButton>

      <Grid container spacing={3} justifyContent="center">
        {state.recipes.map((recipe: any) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h5" gutterBottom style={{ fontFamily: 'Arial, sans-serif' }}>
                  {recipe.Name}
                </Typography>
                <img
                  src={recipe.Img}
                  alt={recipe.Name}
                  width="100%"
                  style={{ borderRadius: "8px", marginBottom: "10px" }}
                />
                <Typography variant="body1">⏳ Duration: {recipe.Duration} min</Typography>
                <Typography variant="body1">🔥 Difficulty: {recipe.Difficulty}</Typography>
                <Typography variant="body2" paragraph>
                  📖 {recipe.Description}
                </Typography>

                <Typography variant="h6">📋 Instructions:</Typography>
                <ul>
                  {recipe.Instructions.map((step: any, index: any) => (
                    <li key={index}>{step.Name}</li>
                  ))}
                </ul>

                <Typography variant="h6">🛒 Ingredients:</Typography>
                <ul>
                  {recipe.Ingridents.map((ing: any, index: any) => (
                    <li key={index}>
                      {ing.Name} - {ing.Count} {ing.Type}
                    </li>
                  ))}
                </ul>

                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <IconButton color="primary" onClick={() => handleEditRecipe(recipe.Id)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton color="secondary" onClick={() => handleDeleteRecipe(recipe.Id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllRecipes;
