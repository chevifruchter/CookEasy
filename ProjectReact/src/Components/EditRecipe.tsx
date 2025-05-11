"use client"

import type React from "react"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import RecipeStore from "../stores/MobxRec"
import { useParams } from "react-router-dom"
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  IconButton,
  Divider,
  Alert,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material"
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"

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
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    flexDirection: "column",
    gap: 3,
  },
  loadingSpinner: {
    color: "#FF6B35",
  },
}

const EditRecipeForm = () => {
  // Logic - Unchanged
  const { id } = useParams<{ id: string }>()
  const currId = Number(id)
  // const theme = useTheme()

  useEffect(() => {
    RecipeStore.fetchRecipe(currId)
  }, [id])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | SelectChangeEvent<Number>,
    field: string,
  ) => {
    RecipeStore.updateField(field, e.target.value)
  }

  const handleAddIngredient = () => {
    RecipeStore.updateField("Ingridents", [
      ...(RecipeStore.currRecipe?.Ingridents || []),
      { Name: "", Count: "", Type: "" },
    ])
  }

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...(RecipeStore.currRecipe?.Ingridents || [])]
    newIngredients.splice(index, 1)
    RecipeStore.updateField("Ingridents", newIngredients)
  }

  const handleAddInstruction = () => {
    RecipeStore.updateField("Instructions", [...(RecipeStore.currRecipe?.Instructions || []), { Name: "" }])
  }

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = [...(RecipeStore.currRecipe?.Instructions || [])]
    newInstructions.splice(index, 1)
    RecipeStore.updateField("Instructions", newInstructions)
  }

  const handleSave = async () => {
    await RecipeStore.updateRecipe()
    setTimeout(() => RecipeStore.clearSuccessMessage(), 3000)
  }

  // UI Rendering - Loading State
  if (RecipeStore.isLoading) {
    return (
      <Container maxWidth="md" sx={STYLES.container}>
        <Box sx={STYLES.loadingContainer}>
          <CircularProgress size={50} sx={STYLES.loadingSpinner} />
          <Typography variant="h6" color="text.secondary">
            Loading recipe...
          </Typography>
        </Box>
      </Container>
    )
  }

  // UI Rendering - Edit Form
  return (
    <Container maxWidth="lg" sx={STYLES.container}>
      <Paper elevation={0} sx={STYLES.paper}>
        <Box sx={STYLES.paperBackground} />
        <Box sx={STYLES.content}>
          {/* Title */}
          <Typography variant="h4" component="h1" align="center" sx={STYLES.title}>
            Edit Recipe
          </Typography>

          {/* Success Message */}
          {RecipeStore.successMessage && (
            <Alert
              severity="success"
              sx={{
                my: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
              }}
            >
              {RecipeStore.successMessage}
            </Alert>
          )}

          <form onSubmit={(e) => e.preventDefault()}>
            {/* Recipe Image */}
            {RecipeStore.currRecipe?.Img && (
              <Card sx={{ mb: 4, borderRadius: 3, overflow: "hidden", boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}>
                <CardMedia
                  component="img"
                  image={RecipeStore.currRecipe?.Img}
                  alt="Recipe"
                  sx={{ height: 300, objectFit: "cover" }}
                />
              </Card>
            )}

            {/* Basic Info */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Recipe Name"
                  fullWidth
                  value={RecipeStore.currRecipe?.Name || ""}
                  onChange={(e) => handleInputChange(e, "Name")}
                  variant="outlined"
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  value={RecipeStore.currRecipe?.Description || ""}
                  onChange={(e) => handleInputChange(e, "Description")}
                  variant="outlined"
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Preparation Time (minutes)"
                  type="number"
                  fullWidth
                  value={RecipeStore.currRecipe?.Duration}
                  onChange={(e) => handleInputChange(e, "Duration")}
                  variant="outlined"
                  sx={STYLES.inputField}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined" sx={STYLES.inputField}>
                  <InputLabel>Difficulty Level</InputLabel>
                  <Select
                    value={RecipeStore.currRecipe?.Difficulty}
                    onChange={(e) => handleInputChange(e, "Difficulty")}
                    label="Difficulty Level"
                  >
                    <MenuItem value="">Select Difficulty</MenuItem>
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="outlined" sx={STYLES.inputField}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={RecipeStore.currRecipe?.Categoryid}
                    onChange={(e) => handleInputChange(e, "Categoryid")}
                    label="Category"
                  >
                    <MenuItem value="">Select Category</MenuItem>
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

            {RecipeStore.currRecipe?.Ingridents.map((ingredient, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={5}>
                  <TextField
                    label="Ingredient Name"
                    fullWidth
                    value={ingredient.Name || ""}
                    onChange={(e) => {
                      const newIngredients = [...(RecipeStore.currRecipe?.Ingridents || [])]
                      newIngredients[index].Name = e.target.value
                      RecipeStore.updateField("Ingridents", newIngredients)
                    }}
                    variant="outlined"
                    size="small"
                    sx={STYLES.inputField}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Amount"
                    fullWidth
                    value={ingredient.Count || ""}
                    onChange={(e) => {
                      const newIngredients = [...(RecipeStore.currRecipe?.Ingridents || [])]
                      newIngredients[index].Count = Number(e.target.value)
                      RecipeStore.updateField("Ingridents", newIngredients)
                    }}
                    variant="outlined"
                    size="small"
                    sx={STYLES.inputField}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    label="Unit"
                    fullWidth
                    value={ingredient.Type || ""}
                    onChange={(e) => {
                      const newIngredients = [...(RecipeStore.currRecipe?.Ingridents || [])]
                      newIngredients[index].Type = e.target.value
                      RecipeStore.updateField("Ingridents", newIngredients)
                    }}
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

            {RecipeStore.currRecipe?.Instructions.map((instruction, index) => (
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
                    onChange={(e) => {
                      const newInstructions = [...(RecipeStore.currRecipe?.Instructions || [])]
                      newInstructions[index].Name = e.target.value
                      RecipeStore.updateField("Instructions", newInstructions)
                    }}
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
                onClick={() => window.history.back()}
              >
                Back
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

export default observer(EditRecipeForm)
