"use client"

import { useEffect, useState, useContext } from "react"
import axios from "axios"
import type { Category, Recipe } from "../Repositories/Types"
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  useTheme,
  type SelectChangeEvent,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material"
import { Search, ListFilter, Clock } from "lucide-react"
import { userContext } from "../Context/userContext"
import ShowAllRecipes from "./ShowAllRecipe"

// 1. חלק העיצוב - Styling Part
const STYLES = {
  container: {
    py: 6,
    mt: 0,
  },
  paper: {
    p: { xs: 3, md: 4 },
    borderRadius: 3,
    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
    background: "white",
  },
  title: {
    fontWeight: 700,
    fontSize: "2rem",
    mb: 1,
    textAlign: "center",
  },
  subtitle: {
    color: "text.secondary",
    mb: 4,
    textAlign: "center",
  },
  filterCard: {
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
    border: "none",
    mb: 4,
  },
  filterHeader: {
    p: 1,
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
  },
  filterContent: {
    p: 3,
  },
  filterTitle: {
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    mb: 3,
    color: "#333",
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
    },
  },
}

// 2. חלק הלוגיקה - Logic Part
const RecipesPage = () => {
  // State variables
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [filtered, setFiltered] = useState<Recipe[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filters, setFilters] = useState({
    category: "",
    duration: "",
    difficulty: "",
    user: "",
  })

  const arrDifficulty: string[] = ["", "easy", "medium", "hard"]
  const users = useContext(userContext)

  // Side effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRecipes = await axios.get("http://localhost:8080/api/recipe")
        const resCategories = await axios.get("http://localhost:8080/api/category")
        setRecipes(resRecipes.data)
        setFiltered(resRecipes.data) // Initialize filtered with all recipes
        setCategories(resCategories.data)
      } catch (err) {
        console.error("Error loading data", err)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let result = recipes
    let cat: Category | undefined = { Id: 0, Name: "" }

    if (filters.category !== "") {
      cat = categories.find((c) => c.Name === filters.category)
      result = result.filter((r) => r.Categoryid === cat?.Id)
    }

    if (filters.difficulty !== "") {
      const index = arrDifficulty.findIndex((d) => d === filters.difficulty)
      if (index !== -1) {
        result = result.filter((recipe) => recipe.Difficulty === index)
      }
    }

    if (filters.duration && !isNaN(Number(filters.duration))) {
      const maxDuration = Number(filters.duration)

      result = result.filter((r) => {
        const recipeDuration = Number(r.Duration)
        return !isNaN(recipeDuration) && recipeDuration <= maxDuration
      })
    }

    if (filters.user) {
      const userId = users.users?.find((u) => u.UserName === filters.user)?.Id
      result = result.filter((r) => r.UserId === userId)
    }

    setFiltered(result)
  }, [filters, recipes, categories, users])

  // Event handlers
  const handleChange = (field: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // UI Rendering
  return (
    <Container maxWidth="lg" sx={STYLES.container}>
      <Paper sx={STYLES.paper}>
        {/* Header */}
        <Typography variant="h4" component="h1" sx={STYLES.title}>
          Recipe Collection
        </Typography>
        <Typography variant="subtitle1" sx={STYLES.subtitle}>
          Discover amazing recipes and filter by your preferences
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* Filters - Explicitly included */}
        <Card variant="outlined" sx={STYLES.filterCard}>
          <Box sx={STYLES.filterHeader} />
          <CardContent sx={STYLES.filterContent}>
            <Box sx={STYLES.filterTitle}>
              <ListFilter size={22} style={{ marginRight: 8, color: "#FF6B35" }} />
              <Typography variant="h6">Filter Recipes</Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined" size="small" sx={STYLES.inputField}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={filters.category}
                    onChange={(e: SelectChangeEvent) => handleChange("category", e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.Id} value={cat.Name}>
                        {cat.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth variant="outlined" size="small" sx={STYLES.inputField}>
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Select
                    labelId="difficulty-label"
                    name="difficulty"
                    value={filters.difficulty}
                    onChange={(e: SelectChangeEvent) => handleChange("difficulty", e.target.value)}
                    label="Difficulty"
                  >
                    <MenuItem value="">All Difficulties</MenuItem>
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  type="number"
                  name="duration"
                  label="Max Prep Time (minutes)"
                  value={filters.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Clock size={20} />
                      </InputAdornment>
                    ),
                  }}
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  name="user"
                  label="Creator ID"
                  value={filters.user}
                  onChange={(e) => handleChange("user", e.target.value)}
                  size="small"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={20} />
                      </InputAdornment>
                    ),
                  }}
                  sx={STYLES.inputField}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Recipe List */}
        <ShowAllRecipes recipeArrToShow={filtered} />
      </Paper>
    </Container>
  )
}

export default RecipesPage
