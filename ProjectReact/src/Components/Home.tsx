"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { userContext } from "../Context/userContext"
import { Container, Box, Typography, Button, useTheme } from "@mui/material"
import { LogIn, Book, LogOut, ChefHat } from "lucide-react"

// 1. חלק העיצוב - Styling Part
const STYLES = {
  container: {
    overflow: "auto",
  },
  heroSection: {
    backgroundImage: "url(https://source.unsplash.com/random/1600x900/?food)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    color: "white",
    py: 12,
    mt: 0,
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
  },
  heroTitle: {
    fontWeight: 700,
    fontSize: { xs: "2.5rem", md: "3.5rem" },
    lineHeight: 1.2,
    mb: 2,
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  heroSubtitle: {
    fontSize: { xs: "1.2rem", md: "1.5rem" },
    mb: 4,
    opacity: 0.9,
    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  primaryButton: {
    borderRadius: 8,
    px: 4,
    py: 1.5,
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    boxShadow: "0 4px 20px rgba(255,107,53,0.5)",
    transition: "transform 0.3s, box-shadow 0.3s",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 6px 25px rgba(255,107,53,0.6)",
    },
  },
  outlinedButton: {
    borderRadius: 8,
    px: 4,
    py: 1.5,
    borderColor: "white",
    color: "white",
    "&:hover": {
      borderColor: "white",
      backgroundColor: "rgba(255,255,255,0.1)",
      transform: "translateY(-5px)",
    },
    transition: "transform 0.3s",
  },
  circleIcon: {
    width: 300,
    height: 300,
    borderRadius: "50%",
    background: "linear-gradient(135deg, rgba(255,107,53,0.8), rgba(46,196,182,0.8))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    animation: "pulse 2s infinite",
    "@keyframes pulse": {
      "0%": {
        transform: "scale(1)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      },
      "50%": {
        transform: "scale(1.05)",
        boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
      },
      "100%": {
        transform: "scale(1)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      },
    },
  },
}

const Home = () => {
  const { MyUser } = useContext(userContext)
  return (
    <Box sx={STYLES.container}>
      {/* Hero Section */}
      <Box sx={STYLES.heroSection}>
        <Box sx={STYLES.heroOverlay} />
        <Container maxWidth="lg" sx={STYLES.heroContent}>
          <Box sx={{ maxWidth: 800 }}>
            <Typography variant="h2" component="h1" sx={STYLES.heroTitle}>
              {MyUser?.Name ? `Welcome, ${MyUser.UserName}!` : "Welcome to CookEazy!"}
            </Typography>

            <Typography variant="h5" sx={STYLES.heroSubtitle}>
              The perfect place to find, share and create your favorite recipes
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={Link}
                to="/AllRecipes"
                startIcon={<Book />}
                sx={STYLES.primaryButton}
              >
                Discover Recipes
              </Button>

              {!MyUser?.Name ? (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/Login"
                  startIcon={<LogIn />}
                  sx={STYLES.outlinedButton}
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={Link}
                  to="/Login"
                  startIcon={<LogOut />}
                  sx={STYLES.outlinedButton}
                >
                  Sign Out
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF6B35, #2EC4B6)",
              display: "inline-flex",
              boxShadow: "0 10px 20px rgba(255,107,53,0.3)",
            }}
          >
            <ChefHat size={40} color="white" />
          </Box>
        </Box>

        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Start Your Culinary Journey
        </Typography>

        <Typography variant="body1" paragraph sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
          CookEazy helps you discover, create, and share amazing recipes. Whether you're a beginner or a seasoned chef,
          our platform provides everything you need to enhance your cooking experience.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/AllRecipes"
          sx={STYLES.primaryButton}
        >
          Browse All Recipes
        </Button>
      </Container>
    </Box>
  )
}

export default Home
