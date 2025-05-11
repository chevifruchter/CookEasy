import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
// import AllRecipes from "./Components/AllRecipes";
// import AddRecipe from "./Components/AddRecipe";
import UserContext from "../src/Context/userContext";
import UpdateRecipe from "./Components/EditRecipe";
import CheckAllRecipes from "./Components/AllRecipes";
import RecipesPage from "./Components/ShowAllRecipe";
import AddRecipeForm from "./Components/AddRecipe";
import EditRecipe from "./Components/EditRecipe";
import Layout from "./Components/Header";
function App() {
    return (
        <UserContext>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Home/></Layout>} />
                <Route path="/Home" element={<Layout><Home/></Layout>} />
                <Route path="/Login" element={<Layout><Login /></Layout>} />
                <Route path="/SignUp" element={<Layout><SignUp /></Layout>} />
                <Route path="/AllRecipes" element={<Layout><CheckAllRecipes /></Layout>} />
                <Route path="/ShowAllRecipe" element={<Layout><RecipesPage recipeArrToShow={[]} /></Layout>} />
                <Route path="/AddRecipe" element={<Layout><AddRecipeForm /></Layout>} />
                <Route path="/EditRecipe/:id" element={<Layout><EditRecipe /></Layout>} />
            </Routes>
            </BrowserRouter>
        </UserContext>
    );
}

export default App;
