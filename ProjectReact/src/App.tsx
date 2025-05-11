import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import MyRecipes from "./Components/MyRecipes";
function App() {
    return (
        <UserContext>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Home" element={<Home/>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/AllRecipes" element={<CheckAllRecipes />} />
                <Route path="/ShowAllRecipe" element={<RecipesPage recipeArrToShow={[]} />} />
                <Route path="/MyRecipes" element={<MyRecipes />} />
                <Route path="/AddRecipe" element={<AddRecipeForm />} />
                {/* <Route path="/EditRecipe" element={<EditRecipe recipeId={""} />} /> */}
                <Route path="/EditRecipe/:id" element={<EditRecipe />} />
            </Routes>
        </Router>
        </UserContext>
    );
}

export default App;
