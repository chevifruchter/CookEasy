import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../Repositories/Types";
import { userContext } from "../Context/userContext";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();
  const { MyUser } = useContext(userContext);
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recipe");
      setRecipes(res.data);
    } catch (err) {
      console.error("שגיאה בטעינת מתכונים", err);
    }
  };
  // פונקציה שבודקת אם המתכון שייך למשתמש הנוכחי
  const isRecipeByCurrentUser = (recipe: Recipe) => {
    return recipe.UserId === MyUser?.Id
  };
  const handleEdit = (id: any) => {
    console.log("עריכת מתכון:", id);
    navigate(`/EditRecipe/${id}`); // ניווט לעמוד עריכת מתכון
    // כאן ניתן להוסיף ניווט לעמוד עריכה או לפתוח מודל
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
      fetchRecipes(); // רענון הרשימה לאחר מחיקה
    } catch (err) {
      console.error("שגיאה במחיקת מתכון", err);
    }
  };

  const handleAddRecipe = () => {
    console.log("הוספת מתכון חדש");
    navigate("/AddRecipe"); // ניווט לעמוד הוספת מתכון
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        רשימת המתכונים שלי
      </Typography>

      <Button variant="contained" color="primary" onClick={handleAddRecipe} style={{ marginBottom: "1rem" }}>
        הוסף מתכון חדש
      </Button>
      <Grid container spacing={2}>
  {recipes
    .filter((r) => isRecipeByCurrentUser(r))
    .map((recipe) => (
      <Grid item xs={12} sm={6} md={3} lg={2} key={recipe.Id}>
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
                  <Button size="small" color="primary" onClick={() => handleEdit(recipe.Id)}>
                    עריכה
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDelete(recipe.Id)}>
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

export default MyRecipes;