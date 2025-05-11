"use client"

import { useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { userContext } from "../Context/userContext"
import type { user } from "../Repositories/Types"
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link as MuiLink,
  InputAdornment,
  useTheme,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Link } from "react-router-dom"
import { LogIn, User, Lock, ChefHat } from "lucide-react"
import { useState } from "react"

// Styling Constants
const STYLES = {
  container: {
    py: 6,
    mt: 2,
  },
  paper: {
    p: 4,
    borderRadius: 4,
    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
    background: "white",
    position: "relative",
    overflow: "hidden",
    maxWidth: 480,
    mx: "auto",
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
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    mb: 3,
  },
  logoCircle: {
    p: 2,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FF6B35, #2EC4B6)",
    display: "inline-flex",
    boxShadow: "0 10px 20px rgba(255,107,53,0.3)",
  },
  title: {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 700,
    fontSize: "2rem",
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    mb: 1,
  },
  subtitle: {
    color: "text.secondary",
    mb: 4,
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
  submitButton: {
    py: 1.5,
    borderRadius: 8,
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    boxShadow: "0 4px 20px rgba(255,107,53,0.3)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 25px rgba(255,107,53,0.4)",
    },
  },
  linkText: {
    fontWeight: "bold",
    background: "linear-gradient(90deg, #FF6B35, #2EC4B6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    transition: "transform 0.2s",
    display: "inline-block",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
}

// Schema definition
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .test("not-email", "Username cannot be an email address", (value) => {
      return !/\S+@\S+\.\S+/.test(value)
    }),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

const Login = () => {
  // Logic - Unchanged
  const navigate = useNavigate()
  const { setMyUser } = useContext(userContext)
  const users: user[] = []
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const setAllUsers = (user: user) => {
    users.push(user)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: { username: string; password: string }) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("http://localhost:8080/api/user/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: data.username,
          Password: data.password,
        }),
      })

      if (response.ok) {
        const user = await response.json()
        setMyUser(user)
        setAllUsers(user)
        navigate("/Home")
      } else {
        setError("Invalid username or password. Please try again or sign up.")
      }
    } catch (error) {
      console.error("Error logging in:", error)
      setError("An error occurred during login. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // UI Rendering
  return (
    <Container maxWidth="md" sx={STYLES.container}>
      <Paper elevation={0} sx={STYLES.paper}>
        <Box sx={STYLES.paperBackground} />
        <Box sx={STYLES.content}>
          {/* Logo and Title */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={STYLES.logoContainer}>
              <Box sx={STYLES.logoCircle}>
                <ChefHat size={40} color="white" />
              </Box>
            </Box>
            <Typography variant="h4" component="h1" sx={STYLES.title}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={STYLES.subtitle}>
              Sign in to access your recipes and continue cooking
            </Typography>
          </Box>

          {/* Alert */}
          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
              }}
            >
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Username"
                fullWidth
                variant="outlined"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={STYLES.inputField}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={STYLES.inputField}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LogIn />}
              sx={STYLES.submitButton}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2">
                Don't have an account yet?{" "}
                <MuiLink component={Link} to="/SignUp" sx={STYLES.linkText}>
                  Sign up now
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
