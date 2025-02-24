import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import AllRecipes from "./Components/AllRecipes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/AllRecipes" element={<AllRecipes />} />
            </Routes>
        </Router>
    );
}

export default App;
