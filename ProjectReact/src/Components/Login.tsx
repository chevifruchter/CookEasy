import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // הוספתי את axios
import "../Designs/login.css";

const schema = yup.object().shape({
    username: yup.string().required("שם משתמש הוא שדה חובה"),
    password: yup.string().min(8, "סיסמה חייבת להכיל לפחות 8 תווים").required("סיסמה היא שדה חובה"),
});

const Login = () => {
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: { username: string; password: string }) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/Login", {
                username: data.username, // שים לב לשינוי כאן!
                password: data.password,
            }, {
                headers: {
                    "Content-Type": "application/json", // כותרת שגידלנו לפורמט JSON
                }
            });

            if (response.status === 200) {
                console.log("User found:", response.data);
                navigate("/Home"); // ניווט לדף הבית
            } else {
                console.log("User not found, redirecting to sign-up");
                navigate("/SignUp"); // תיקון הניווט
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1>Cook Easy🍨</h1>

                <label>UserName:</label>
                <input
                    type="text"
                    {...register("username")}
                />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                <label>Password:</label>
                <input
                    type="password"
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button type="submit">
                    Login 🤍
                    <Link to={"/SignUp"}></Link>
                </button>
            </form>
        </div>
    );
};

export default Login;
