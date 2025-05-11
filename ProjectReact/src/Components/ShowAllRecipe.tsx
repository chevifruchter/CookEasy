"use client"

import type React from "react"
import { useContext, useEffect, useState } from "react"
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Fab,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Avatar,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import type { Recipe } from "../Repositories/Types"
import { userContext } from "../Context/userContext"
import { Edit, Trash2, Plus } from "lucide-react"

// 1. חלק העיצוב - Styling Part
const STYLES = {
  addButton: {
    borderRadius: "24px",
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    px: 3,
    py: 1.5,
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 25px rgba(255,107,53,0.4)",
    },
  },
  recipeCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: 3,
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    },
  },
  cardMedia: {
    height: 180,
    objectFit: "cover",
  },
  cardContent: {
    flexGrow: 1,
    p: 3,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "1.25rem",
    mb: 1.5,
  },
  cardDescription: {
    color: "text.secondary",
    mb: 2,
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  actionButtons: {
    display: "flex",
    gap: 1,
    mt: 2,
  },
  editButton: {
    bgcolor: alpha("#FF6B35", 0.9),
    "&:hover": { bgcolor: "#FF6B35" },
    borderRadius: 2,
    color: "white",
  },
  deleteButton: {
    bgcolor: alpha("#FF5252", 0.9),
    "&:hover": { bgcolor: "#FF5252" },
    borderRadius: 2,
    color: "white",
  },
  emptyState: {
    textAlign: "center",
    py: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
  },
  emptyStateButton: {
    borderRadius: 8,
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 25px rgba(255,107,53,0.4)",
    },
    transition: "transform 0.3s, box-shadow 0.3s",
  },
}

interface ShowAllRecipesProps {
  recipeArrToShow: Recipe[]
}

// 2. חלק הלוגיקה - Logic Part
const ShowAllRecipes: React.FC<ShowAllRecipesProps> = ({ recipeArrToShow }) => {
  if (!recipeArrToShow) return <>There isn't recipes to show</>;
  // State variables
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const { MyUser } = useContext(userContext)
  const navigate = useNavigate()
  const theme = useTheme()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])

  // Side effects
  useEffect(() => {
    fetchRecipes()
  }, [])

  // Helper functions
  const isRecipeByCurrentUser = (recipe: any) => {
    console.log(`Current User ID: ${MyUser?.Id}, Recipe User ID: ${recipe.UserId}`);

    return recipe.UserId === MyUser?.Id
  }

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/recipe")
      setRecipes(res.data)
    } catch (err) {
      console.error("Error loading recipes", err)
    }
  }

  const handleEdit = (recipe: Recipe) => {
    navigate(`/EditRecipe/${recipe.Id}`)
  }

  const openDeleteDialog = (recipe: Recipe) => {
    setRecipeToDelete(recipe)
    setDeleteDialogOpen(true)
  }

  const handleDelete = async () => {
    if (recipeToDelete) {
      try {
        await axios.post(`http://localhost:8080/api/recipe/delete/${recipeToDelete.Id}`)
        fetchRecipes()
        setDeleteDialogOpen(false)
      } catch (err) {
        console.error("Error deleting recipe", err)
      }
    }
  }
  const handleAddRecipe = () => {
    navigate("/AddRecipe")
  }

  if (!recipeArrToShow || recipeArrToShow.length === 0) {
    return (
      <Box sx={STYLES.emptyState}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No recipes match your search
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRecipe}
          startIcon={<Plus />}
          sx={STYLES.emptyStateButton}
        >
          Add New Recipe
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      {/* Add Recipe Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
        <Fab color="primary" variant="extended" onClick={handleAddRecipe} sx={STYLES.addButton}>
          <Plus size={20} />
          Add New Recipe
        </Fab>
      </Box>
      <Grid container spacing={4}>
        {recipeArrToShow.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
            <Card sx={STYLES.recipeCard} elevation={2}>
              <CardMedia
                component="img"
                image={recipe.Img || "https://source.unsplash.com/random/300x200?food"}
                alt={recipe.Name}
                sx={STYLES.cardMedia}
              />
              <CardContent sx={STYLES.cardContent}>
                {/* Recipe Name */}
                <Typography variant="h6" component="h2" sx={STYLES.cardTitle}>
                  {recipe.Name}
                </Typography>

                {/* Recipe Description */}
                <Typography variant="body2" sx={STYLES.cardDescription}>
                  {recipe.Description || "No description available for this recipe"}
                </Typography>

                {/* Chef Info */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar src={`https://i.pravatar.cc/150?u=${recipe.UserId}`} sx={{ width: 24, height: 24, mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Chef #{recipe.UserId}
                  </Typography>
                </Box>

                {/* Edit/Delete Buttons - Only for user's own recipes */}
                {isRecipeByCurrentUser(recipe) && (
                  <Box sx={STYLES.actionButtons}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleEdit(recipe)}
                      startIcon={<Edit size={16} />}
                      sx={STYLES.editButton}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => openDeleteDialog(recipe)}
                      startIcon={<Trash2 size={16} />}
                      sx={STYLES.deleteButton}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the recipe "{recipeToDelete?.Name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ShowAllRecipes;
