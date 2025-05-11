"use client"

import type { ReactNode } from "react"
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
  useTheme,
  alpha,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Menu, X, Home, Book, PlusCircle, LogIn, UserPlus, ChefHat } from "lucide-react"
import { useState } from "react"

// Styling Constants
const STYLES = {
  appBar: {
    backgroundColor: "white",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    position: "sticky",
    top: 0,
    zIndex: 1100,
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  menuButton: {
    borderRadius: 2,
    fontWeight: 500,
    transition: "all 0.3s ease",
    padding: "8px 16px",
    "&:hover": {
      transform: "translateY(-2px)",
      backgroundColor: "rgba(255, 107, 53, 0.08)",
    },
  },
  activeMenuButton: {
    borderBottom: "2px solid #FF6B35",
    borderRadius: 0,
  },
  drawer: {
    width: 280,
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  mainContent: {
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#FAFAFA",
    display: "flex",
    justifyContent: "center", // מרכז אופקית
    alignItems: "center", // או "center" אם רוצים גם אנכית
    paddingTop: 4,
    paddingBottom: 4,
  },
}

export const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const menuItems = [
    { text: "Home", path: "/", icon: <Home size={20} /> },
    { text: "All Recipes", path: "/AllRecipes", icon: <Book size={20} /> },
    { text: "Add Recipe", path: "/AddRecipe", icon: <PlusCircle size={20} /> },
    { text: "Sign In", path: "/Login", icon: <LogIn size={20} /> },
    { text: "Sign Up", path: "/SignUp", icon: <UserPlus size={20} /> },
  ]

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  // UI Rendering
  return (
    <>
      <AppBar elevation={0} sx={STYLES.appBar}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" component="div" sx={STYLES.logo}>
                <ChefHat size={28} />
                CookEazy
              </Typography>
            </Box>

            {/* Mobile Menu Button or Desktop Navigation */}
            {isMobile ? (
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                }}
              >
                <Menu />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="primary"
                    onClick={() => navigate(item.path)}
                    sx={STYLES.menuButton}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          },
        }}
      >
        <Box sx={STYLES.drawer}>
          <Box sx={STYLES.drawerHeader}>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
              Menu
            </Typography>
            <IconButton
              onClick={toggleDrawer}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path)
                    toggleDrawer()
                  }}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Box sx={{ mr: 2, color: theme.palette.primary.main }}>{item.icon}</Box>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={STYLES.mainContent}>
        {children}
      </Box>
    </>
  )
}

export default Layout
