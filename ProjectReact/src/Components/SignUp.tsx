"use client"

import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import type { user } from "../Repositories/Types"
import { userContext } from "../Context/userContext"
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
import { UserPlus, User, Lock, Mail, Phone, CreditCard, ChefHat } from "lucide-react"

// 1. חלק העיצוב - Styling Part
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
    maxWidth: 600,
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
    color: "#FF6B35",
    transition: "transform 0.2s",
    display: "inline-block",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
}

// Schema definition
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  tz: yup.string().required("ID is required").min(9, "ID must be at least 9 characters"),
})

// 2. חלק הלוגיקה - Logic Part
const SignUp = () => {
  // State variables
  const { setMyUser } = useContext(userContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Form submission handler
  const onSubmit = async (data: any) => {
    setLoading(true)
    setError("")

    try {
      const response = await axios.post<user>("http://localhost:8080/api/user/sighin", {
        UserName: data.username,
        Password: data.password,
        Name: data.name,
        Phone: data.phone,
        Email: data.email,
        Tz: data.tz,
      })
      setMyUser({
        Id: response.data.Id,
        Password: response.data.Password,
        Name: response.data.Name,
        UserName: response.data.UserName,
        Phone: response.data.Phone,
        Email: response.data.Email,
        Tz: response.data.Tz,
      })
      setSuccess(true)
      setTimeout(() => {
        navigate("/Home")
      }, 1500)
    } catch (error: any) {
      if (error.response) {
        console.error("❌ Server error:", error.response.status, error.response.data)
        setError("Registration error: " + (error.response.data.message || "Please try again"))
      } else if (error.request) {
        console.error("⚠️ Network error: No response from server")
        setError("No response from server. Please check your internet connection and try again.")
      } else {
        console.error("🔴 Unexpected error:", error.message)
        setError("Unexpected error. Please try again later.")
      }
    } finally {
      setLoading(false)
    }
  }

  // UI Rendering - Removed left image
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
              Join CookEazy
            </Typography>
            <Typography variant="body1" sx={STYLES.subtitle}>
              Create an account to save and share your favorite recipes
            </Typography>
          </Box>

          {/* Alerts */}
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

          {success && (
            <Alert
              severity="success"
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
              }}
            >
              Registration successful! Redirecting to home page...
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 3 }}>
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
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

            <Box sx={{ mb: 3 }}>
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

            <Box sx={{ mb: 3 }}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={STYLES.inputField}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <TextField
                label="Phone"
                fullWidth
                variant="outlined"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={STYLES.inputField}
              />
            </Box>

            <Box sx={{ mb: 4 }}>
              <TextField
                label="ID Number"
                fullWidth
                variant="outlined"
                {...register("tz")}
                error={!!errors.tz}
                helperText={errors.tz?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard size={20} />
                    </InputAdornment>
                  ),
                }}
                sx={STYLES.inputField}
              />
            </Box>

            <Box sx={{ mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UserPlus />}
                sx={STYLES.submitButton}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </Box>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <MuiLink component={Link} to="/Login" sx={STYLES.linkText}>
                  Sign in here
                </MuiLink>
              </Typography>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default SignUp
