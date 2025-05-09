// RecipesPage.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Category, Recipe } from "../Repositories/Types";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context/userContext";
// נניח שיש קונטקסט עם מידע על המשתמש
import ShowAllRecipes from "./ShowAllRecipe"; // Import the ShowAllRecipes component
import { set } from "react-hook-form";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filtered, setFiltered] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    difficulty: "",
    user: "",
  });

  const arrDifficulty:string[] = ["","easy","medium","hard"]
  const navigate = useNavigate();
  const { MyUser } = useContext(userContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRecipes = await axios.get("http://localhost:8080/api/recipe");
        const resCategories = await axios.get("http://localhost:8080/api/category");
  
        setRecipes(resRecipes.data);
        setCategories(resCategories.data);
        setFiltered(resRecipes.data); // ברירת מחדל, לפני סינון
      } catch (err) {
        console.error("שגיאה בטעינת נתונים", err);
      }
    };
  
    fetchData();
  }, []);
  
useEffect(() => {
  let result = recipes;
  let cat:Category|undefined = {Id:0,Name:""}; // Initialize cat with a default value
  if (filters.category!="") {
    cat = categories.find(c => c.Name == filters.category);
    console.log(cat);
    result = result.filter(r => r.Categoryid === cat?.Id);
  }

  if (filters.difficulty !== "") {
    const index = arrDifficulty.findIndex((d) => d === filters.difficulty);
    if (index !== -1) {
      result = result.filter(recipe => recipe.Difficulty === index);
    }
  }
  

  if (filters.duration) {
    result = result.filter(r => Number(r.Duration) <= Number(filters.duration));
  }

  if (filters.user) {
    result = result.filter(r => r.UserId.includes(filters.user));
  }

  setFiltered(result);
}, [filters, recipes]);


const handleChange = (filed:string,value:any)=>{
  setFilters((prev) => ({
    ...prev,
    [filed]: value,
  }));
  console.log(filters);
}

  const handleDelete = async (id: any) => {
    try {
      await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
      // fetchRecipes();
    } catch (err) {
      console.error("שגיאה במחיקה", err);
    }
  };

  const search=()=>{
    
  }
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", height: "100vh", overflow: "auto" }}>
    {/* כותרת */}
    <h1 style={{ textAlign: "center", marginBottom: "20px", position: "sticky", top: "0", backgroundColor: "white", zIndex: 1 }}>רשימת מתכונים</h1>

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
      {/* <Typography variant="h4" gutterBottom>רשימת מתכונים</Typography> */}

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={3}>
          <Select
            name="category"
            value={filters.category}
            onChange={(e)=>handleChange("category",e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value={categories.map((c)=>{c.Name})}>כל הקטגוריות</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat.Id} value={cat.Id ?? ''}>{cat.Name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            name="difficulty"
            value={filters.difficulty}
            onChange={(e)=>handleChange("difficulty",e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">Select Difficulty</MenuItem>
            <MenuItem value="easy">easy</MenuItem>
            <MenuItem value="medium">medium</MenuItem>
            <MenuItem value="hard">hard</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            type="number"
            name="duration"
            label="זמן הכנה עד (בדקות)"
            value={filters.duration}
            onChange={(e)=>handleChange("duration",e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            name="user"
            label="מזהה יוצר"
            value={filters.user}
            onChange={(e)=>handleChange("user",e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3}>
          <Button
            style={{
              width: "15%",
              left: "10px",
              backgroundColor: "offwhite",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={() => console.log("חיפוש בוצע עם הפילטרים:", filters)}
          >
            חיפוש
          </Button>
        </Grid>
      {/* <Grid container spacing={3}>
      </Grid> */}
      {/* <Link to="/ShowAllRecipe" className="link-button">
        <button className="custom-button primary">all recipes</button>
      </Link> */}
<ShowAllRecipes/>
    </div>
    </div>
  );
};

export default RecipesPage;
