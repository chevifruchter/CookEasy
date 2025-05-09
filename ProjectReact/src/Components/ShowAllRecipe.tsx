import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../Repositories/Types";
import { userContext } from "../Context/userContext";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { MyUser } = useContext(userContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRecipes();
  }, []);

  const isRecipeByCurrentUser = (recipe:any) => {
    return recipe.UserId === MyUser?.Id;
  };

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recipe");
      setRecipes(res.data);
    } catch (err) {
      console.error("שגיאה בטעינת מתכונים", err);
    }
  };

  const handleEdit = (recipe:Recipe) => {
    console.log("עריכת מתכון:", recipe.Id);
    // if(isRecipeByCurrentUser(recipe))
    navigate(`/EditRecipe/${recipe.Id}`); // ניווט לעמוד עריכת מתכון
    // כאן ניתן להוסיף ניווט לעמוד עריכה או לפתוח מודל
  };

  const handleDelete = async (recipe:Recipe) => {
    if(isRecipeByCurrentUser(recipe)){
    try {
      await axios.post(`http://localhost:8080/api/recipe/delete/${recipe.Id}`);
      fetchRecipes(); // רענון הרשימה לאחר מחיקה
    } catch (err) {
      console.error("שגיאה במחיקת מתכון", err);
    }
  }
  };

  const handleAddRecipe = () => {
    console.log("הוספת מתכון חדש");
    navigate("/AddRecipe"); // ניווט לעמוד הוספת מתכון
  };

  return (
    <div style={{ padding: "2rem" }}>
      {/* <Typography variant="h4" gutterBottom>
        רשימת מתכונים
      </Typography> */}

      <Button variant="contained" color="primary" onClick={handleAddRecipe} style={{ marginBottom: "1rem" }}>
        הוסף מתכון חדש
      </Button>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={40} sm={40} md={20} key={recipe.Id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={recipe.Img || "https://via.placeholder.com/150"} // תמונה ברירת מחדל אם אין URL
                alt={recipe.Name}
              />
              <CardContent>
                <Typography variant="h6">{recipe.Name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {recipe.Description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleEdit(recipe)}>
                  עריכה
                </Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(recipe)}>
                  מחיקה
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipesPage;