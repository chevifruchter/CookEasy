// RecipesPage.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Category, Recipe} from "../Repositories/Types";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { userContext } from "../Context/userContext";
import ShowAllRecipes from "./ShowAllRecipe"; 

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

  const arrDifficulty: string[] = ["", "easy", "medium", "hard"]
  const users = useContext(userContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRecipes = await axios.get("http://localhost:8080/api/recipe");
        const resCategories = await axios.get("http://localhost:8080/api/category");
        setRecipes(resRecipes.data);
        setCategories(resCategories.data);
      } catch (err) {
        console.error("שגיאה בטעינת נתונים", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = recipes;
    let cat: Category | undefined = { Id: 0, Name: "" };

    if (filters.category !== "") {
      cat = categories.find(c => c.Name === filters.category);
      result = result.filter(r => r.Categoryid === cat?.Id);
    }

    if (filters.difficulty !== "") {
      const index = arrDifficulty.findIndex((d) => d === filters.difficulty);
      if (index !== -1) {
        result = result.filter(recipe => recipe.Difficulty === index);
      }
    }

    if (filters.duration && !isNaN(Number(filters.duration))) {
      const maxDuration = Number(filters.duration);

      result = result.filter(r => {
        const recipeDuration = Number(r.Duration);
        return !isNaN(recipeDuration) && recipeDuration <= maxDuration;
      });
    }


    if (filters.user) {
      const userId = users.users?.find(u => u.UserName === filters.user)?.Id;
      result = result.filter(r => r.UserId === userId);
    }
    console.log(users.users?.map(u => u.UserName + u.Id));

    setFiltered(result); 
  }, [filters, recipes, categories, users]);


  const handleChange = (filed: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filed]: value,
    }));
    console.log(filters);
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", height: "100vh", overflow: "auto" }}>
      {/* כותרת */}
      <h1 style={{ textAlign: "center", marginBottom: "20px", position: "sticky", top: "0", backgroundColor: "white", zIndex: 1 }}>רשימת מתכונים</h1>

      {/* מיכל עם גלילה אנכית */}
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
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={3}>
            <Select
              name="category"
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="">כל הקטגוריות</MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.Id} value={cat.Name}>
                  {cat.Name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Select
              name="difficulty"
              value={filters.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
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
              onChange={(e) => handleChange("duration", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              name="user"
              label="מזהה יוצר"
              value={filters.user}
              onChange={(e) => handleChange("user", e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
        </Grid>
        <ShowAllRecipes recipeArrToShow={filtered} />
      </div>
    </div>
  );
};

export default RecipesPage;
