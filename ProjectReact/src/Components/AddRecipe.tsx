"use client"

import axios from "axios"
import type React from "react"
import { useContext, useState } from "react"
import type { Recipe, RecipeToAdd } from "../Repositories/Types"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  useTheme,
  alpha,
  Alert,
  type SelectChangeEvent,
} from "@mui/material"
import { Plus, Trash2, Save, ImageIcon, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../Context/userContext"

// Styling Constants
const STYLES = {
  container: {
    py: 6,
    mt: 2,
  },
  paper: {
    p: { xs: 3, md: 4 },
    borderRadius: 3,
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    background: "white",
    position: "relative",
    overflow: "hidden",
  },
  paperBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "200px",
    background: "linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(46,196,182,0.05) 100%)",
    zIndex: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "2rem",
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 3,
  },
  sectionTitle: {
    fontWeight: 600,
    color: "#333",
    display: "flex",
    alignItems: "center",
    "&:before": {
      content: '""',
      display: "block",
      width: 4,
      height: 24,
      backgroundColor: "#FF6B35",
      marginRight: 2,
      borderRadius: 2,
    },
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "transform 0.2s",
      "&:hover": {
        transform: "translateY(-2px)",
      },
      "&.Mui-focused": {
        transform: "translateY(-2px)",
      },
    },
  },
  addButton: {
    borderRadius: 8,
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    boxShadow: "0 4px 15px rgba(255,107,53,0.2)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(255,107,53,0.3)",
    },
  },
  saveButton: {
    borderRadius: 8,
    background: "linear-gradient(90deg, #4CAF50, #2EC4B6)",
    boxShadow: "0 4px 15px rgba(76,175,80,0.2)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(76,175,80,0.3)",
    },
  },
  backButton: {
    borderRadius: 8,
    borderColor: alpha("#FF6B35", 0.5),
    color: "#FF6B35",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: "#FF6B35",
      backgroundColor: alpha("#FF6B35", 0.05),
    },
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(45deg, #FF6B35, #2EC4B6)",
    color: "white",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  deleteButton: {
    bgcolor: alpha("#f44336", 0.1),
    "&:hover": {
      bgcolor: alpha("#f44336", 0.2),
      transform: "scale(1.1)",
    },
    transition: "transform 0.2s",
  },
}

const AddRecipeForm = () => {
  // Logic - Unchanged
  const theme = useTheme()
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const MyUser=useContext(userContext)
  const [recipe, setRecipe] = useState<RecipeToAdd>({
    Name: "",
    Img: "",
    UserId: `${MyUser?.MyUser?.Id}`,
    Categoryid: 1,
    Duration: 0,
    Difficulty: 0,
    Description: "",
    Ingridents: [{ Name: "", Count: 0, Type: "" }],
    Instructions: [{ Name: "" }],
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    field: string,
  ) => {
    setRecipe({
      ...recipe,
      [field]: e.target.value,
    })
  }

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const newIngredients = [...recipe.Ingridents]
    newIngredients[index] = { ...newIngredients[index], [field]: value }
    setRecipe({
      ...recipe,
      Ingridents: newIngredients,
    })
  }

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...recipe.Instructions]
    newInstructions[index].Name = value
    setRecipe({
      ...recipe,
      Instructions: newInstructions,
    })
  }

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      Ingridents: [...recipe.Ingridents, { Name: "", Count: 0, Type: "" }],
    })
  }

  const handleRemoveIngredient = (index: number) => {
    if (recipe.Ingridents.length > 1) {
      const newIngredients = [...recipe.Ingridents]
      newIngredients.splice(index, 1)
      setRecipe({
        ...recipe,
        Ingridents: newIngredients,
      })
    }
  }

  const handleAddInstruction = () => {
    setRecipe({
      ...recipe,
      Instructions: [...recipe.Instructions, { Name: "" }],
    })
  }

  const handleRemoveInstruction = (index: number) => {
    if (recipe.Instructions.length > 1) {
      const newInstructions = [...recipe.Instructions]
      newInstructions.splice(index, 1)
      setRecipe({
        ...recipe,
        Instructions: newInstructions,
      })
    }
  }

  const handleSave = async () => {
    try {
      await axios.post<Recipe>("http://localhost:8080/api/recipe", recipe)
      console.log("✅ Saved:")
      setSuccess(true)
      setTimeout(() => {
        navigate("/AllRecipes")
      }, 2000)
    } catch (error) {
      console.error("❌ Error adding recipe:", error)
      setError("An error occurred while saving the recipe. Please try again.")
    }
  }

  return (
    <Container maxWidth="lg" sx={STYLES.container}>
      <Paper elevation={0} sx={STYLES.paper}>
        <Box sx={STYLES.paperBackground} />
        <Box sx={STYLES.content}>
          {/* Title */}
          <Typography variant="h4" component="h1" align="center" sx={STYLES.title}>
            Create New Recipe
          </Typography>

          {/* Alerts */}
          {success && (
            <Alert
              severity="success"
              sx={{
                my: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
              }}
            >
              Recipe saved successfully! Redirecting to recipes list...
            </Alert>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{
                my: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Image Section */}
            <Box sx={{ mb: 4 }}>
              <TextField
                label="Image URL"
                fullWidth
                value={recipe.Img}
                onChange={(e) => handleInputChange(e, "Img")}
                placeholder="Enter image URL"
                variant="outlined"
                InputProps={{
                  startAdornment: <ImageIcon size={20} style={{ marginRight: 8, color: "#999" }} />,
                }}
                sx={STYLES.inputField}
              />

              {recipe.Img && (
                <Card sx={{ mt: 2, borderRadius: 3, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
                  <CardMedia component="img" image={recipe.Img} alt="Recipe" sx={{ height: 300, objectFit: "cover" }} />
                </Card>
              )}
            </Box>

            {/* Basic Info */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Recipe Name"
                  fullWidth
                  value={recipe.Name}
                  onChange={(e) => handleInputChange(e, "Name")}
                  placeholder="Enter recipe name"
                  variant="outlined"
                  required
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={recipe.Description}
                  onChange={(e) => handleInputChange(e, "Description")}
                  placeholder="Enter a short description for your recipe"
                  variant="outlined"
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Preparation Time (minutes)"
                  type="number"
                  fullWidth
                  value={recipe.Duration}
                  onChange={(e) => handleInputChange(e, "Duration")}
                  placeholder="Enter preparation time in minutes"
                  variant="outlined"
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined" sx={STYLES.inputField}>
                  <InputLabel>Difficulty Level</InputLabel>
                  <Select
                    value={recipe.Difficulty.toString()}
                    onChange={(e) => handleInputChange(e, "Difficulty")}
                    label="Difficulty Level"
                  >
                    <MenuItem value="0">Select Difficulty</MenuItem>
                    <MenuItem value="1">Easy</MenuItem>
                    <MenuItem value="2">Medium</MenuItem>
                    <MenuItem value="3">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined" sx={STYLES.inputField}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={recipe.Categoryid.toString()}
                    onChange={(e) => handleInputChange(e, "Categoryid")}
                    label="Category"
                  >
                    <MenuItem value="0">Select Category</MenuItem>
                    <MenuItem value="1">Category 1</MenuItem>
                    <MenuItem value="2">Category 2</MenuItem>
                    <MenuItem value="3">Category 3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Ingredients Section */}
            <Box sx={{ mt: 5, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={STYLES.sectionTitle}>
                Ingredients
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>

            {recipe.Ingridents.map((ingredient, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Ingredient Name"
                    fullWidth
                    value={ingredient.Name}
                    onChange={(e) => handleIngredientChange(index, "Name", e.target.value)}
                    placeholder="Ingredient name"
                    variant="outlined"
                    size="small"
                    sx={STYLES.inputField}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Amount"
                    fullWidth
                    value={ingredient.Count}
                    onChange={(e) => handleIngredientChange(index, "Count", e.target.value)}
                    placeholder="Amount"
                    variant="outlined"
                    size="small"
                    sx={STYLES.inputField}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Unit"
                    fullWidth
                    value={ingredient.Type}
                    onChange={(e) => handleIngredientChange(index, "Type", e.target.value)}
                    placeholder="Unit (g, tbsp, etc.)"
                    variant="outlined"
                    size="small"
                    sx={STYLES.inputField}
                  />
                </Grid>
                <Grid item xs={12} sm={1} sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveIngredient(index)}
                    size="small"
                    disabled={recipe.Ingridents.length <= 1}
                    sx={STYLES.deleteButton}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={handleAddIngredient}
              sx={{
                ...STYLES.addButton,
                mt: 1,
                mb: 4,
              }}
              size="small"
            >
              Add Ingredient
            </Button>

            {/* Instructions Section */}
            <Box sx={{ mt: 5, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={STYLES.sectionTitle}>
                Preparation Steps
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Box>

            {recipe.Instructions.map((instruction, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 3 }}>
                <Grid
                  item
                  xs={1}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    pt: 2,
                  }}
                >
                  <Box sx={STYLES.stepNumber}>{index + 1}</Box>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    multiline
                    value={instruction.Name}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder="Describe this step"
                    variant="outlined"
                    size="small"
                    sx={STYLES.inputField}
                  />
                </Grid>
                <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveInstruction(index)}
                    size="small"
                    disabled={recipe.Instructions.length <= 1}
                    sx={STYLES.deleteButton}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Grid>
              </Grid>
            ))}

            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              onClick={handleAddInstruction}
              sx={{
                ...STYLES.addButton,
                mt: 1,
                mb: 5,
              }}
              size="small"
            >
              Add Step
            </Button>

            {/* Action Buttons */}
            <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                startIcon={<ArrowLeft />}
                sx={STYLES.backButton}
                onClick={() => navigate("/AllRecipes")}
              >
                Back to Recipes
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                startIcon={<Save />}
                sx={STYLES.saveButton}
              >
                Save Recipe
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default AddRecipeForm
