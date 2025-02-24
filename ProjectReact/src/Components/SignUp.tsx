// // import React, { useState } from "react";
// // import { useForm } from "react-hook-form";
// // // import "../Designs/SignUp.css";

// // const SignUp = () => {
// //     const { register, handleSubmit, reset } = useForm();
// //     const [message, setMessage] = useState("");

// //     const onSubmit = async (data: {Password: string; Name: string;UserName: string; Phone: string; Email: string;Tz: string }) => {
// //         try {
// //             const response = await fetch("http://localhost:8080/api/user/login", {
// //                 method: "POST",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify(data),
// //             });

// //             if (response.ok) {
// //                 setMessage("נרשמת בהצלחה!");
// //                 reset(); // מאפס את הטופס אחרי הרשמה מוצלחת
// //             } else {
// //                 setMessage("שגיאה בהרשמה, נסה שנית.");
// //             }
// //         } catch (error) {
// //             console.error("Error signing up:", error);
// //             setMessage("שגיאה בחיבור לשרת.");
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>הרשמה</h2>
// //             <form onSubmit={handleSubmit(onSubmit)}>
// //                 <input {...register("Password", { required: true })} type="password" placeholder="Password:" required />
// //                 <input {...register("Name", { required: true })} placeholder="Name:" required />
// //                 <input {...register("UserName", { required: true })} placeholder="UserName:" required />
// //                 <input {...register("Phone", { required: true })} placeholder="Phone:" required />
// //                 <input {...register("Email", { required: true })} type="email" placeholder="Email:" required />
// //                 <input {...register("Tz", { required: true })} placeholder="Tz:" required />
// //                 <button type="submit">SignUp 🤍</button>
// //             </form>
// //             {message && <p>{message}</p>}
// //         </div>
// //     );
// // };

// export default SignUp;

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { data, useNavigate } from "react-router-dom";
import axios from "axios"; // ייבוא axios
import "../Designs/SignUp.css";
import { user } from "../Types";
import { userContext } from "../useContext";

// הגדרת הסכמת וולידציה עם yup
const schema = yup.object().shape({
    name: yup.string().required("שם הוא שדה חובה"),
    username: yup.string().required("שם משתמש הוא שדה חובה").min(4, "שם משתמש חייב להיות לפחות 4 תווים"),
    password: yup.string().required("סיסמה היא שדה חובה").min(8, "סיסמה חייבת להכיל לפחות 8 תווים"),
    phone: yup.string().required("טלפון הוא שדה חובה"),
    email: yup.string().required("אימייל הוא שדה חובה").email("אימייל לא חוקי"),
    tz: yup.string().required("תעודת זהות היא שדה חובה").min(9, "תעודת זהות חייבת להכיל לפחות 9 תווים"),
});

const SignUp = () => {
    const { setMyUser } = useContext(userContext);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // פונקציה שתטפל בנתונים לאחר שליחת הטופס
    const onSubmit = async (data:any) => {
        console.log(data);
        
        try {
            const response = await axios.post<user>("http://localhost:8080/api/user/sighin", data, {
                headers: { "Content-Type": "application/json" },
              });

            if (response.status === 201) {
                const user = response.data;
                console.log("User created:", user);
                navigate("/Home"); // לאחר הצלחה, מעביר לדף הבית
            } else {
                console.log("Error creating user, try again.");
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h1>Sign Up</h1>
                {/* שדה שם משתמש */}
                <label>UserName:</label>
                <input type="text" {...register("username")} />
                {errors.username && <p className="text-red-500">{errors.username.message}</p>}

                {/* שדה סיסמה */}
                <label>Password:</label>
                <input type="password" {...register("password")} />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                {/* שדה שם */}
                <label>Name:</label>
                <input type="text" {...register("name")} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                {/* שדה טלפון */}
                <label>Phone:</label>
                <input type="text" {...register("phone")} />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

                {/* שדה אימייל */}
                <label>Email:</label>
                <input type="email" {...register("email")} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                {/* שדה תעודת זהות */}
                <label>TZ (ID):</label>
                <input type="text" {...register("tz")} />
                {errors.tz && <p className="text-red-500">{errors.tz.message}</p>}

                <button type="submit">Sign Up 🤍</button>
            </form>
        </div>
    );
};

export default SignUp;












// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import { CircularProgress } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import "../Designs/SignUp.css";

// // סכמת אימות
// const schema = yup.object().shape({
//     UserName: yup.string().required("יש להזין שם משתמש").min(4, "שם משתמש חייב להיות לפחות 4 תווים"),
//     Password: yup.string().required("יש להזין סיסמה").min(8, "סיסמה חייבת להכיל לפחות 8 תווים"),
//     Name: yup.string().required("יש להזין שם מלא"),
//     Phone: yup.string().matches(/\d{10}/, "מספר טלפון חייב להיות בן 10 ספרות").required("יש להזין טלפון"),
//     Email: yup.string().email("כתובת אימייל לא תקינה").required("יש להזין אימייל"),
//     Tz: yup.string().length(9, "תעודת זהות חייבת להכיל 9 ספרות").required("יש להזין תעודת זהות"),
// });

// const SignUp = () => {
//     const [loading, setLoading] = useState(false);
//     const [msg, setMsg] = useState("");
//     const navigate = useNavigate();

//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isValid },
//         reset,
//         setError,
//     } = useForm({
//         resolver: yupResolver(schema),
//         mode: "onChange",
//     });

//     const onSubmit = async (data:{UserName:String, Password:String, Name:String, Phone:String, Email:String, Tz:String }) => {
//         setLoading(true);
//         try {
//             const response = await axios.post("http://localhost:8080/api/user/Sighin", data, {
//                 headers: { "Content-Type": "application/json" },
//             });

//             setMsg("נרשמת בהצלחה");
//             console.log(data)
//             reset();
//             navigate("/Home");
//         } catch (error) {
//             if (error.response?.data?.includes("unique")) {
//                 setError("UserName", { message: "המשתמש כבר רשום במערכת" });
//             } else {
//                 setError("UserName", { message: "שגיאה בהרשמה, נסה שנית." });
//             }
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="signup-container">
//             {msg !== "" && <div className="error-message">{msg}</div>}
//             <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
//                 <h2>הרשמה</h2>
//                 <input {...register("UserName")} placeholder="שם משתמש" />
//                 <p>{errors.UserName?.message}</p>
//                 <input {...register("Password")} type="password" placeholder="סיסמה" />
//                 <p>{errors.Password?.message}</p>
//                 <input {...register("Name")} placeholder="שם מלא" />
//                 <p>{errors.Name?.message}</p>
//                 <input {...register("Phone")} placeholder="טלפון" />
//                 <p>{errors.Phone?.message}</p>
//                 <input {...register("Email")} placeholder="אימייל" />
//                 <p>{errors.Email?.message}</p>
//                 <input {...register("Tz")} placeholder="תעודת זהות" />
//                 <p>{errors.Tz?.message}</p>
//                 <button type="submit" disabled={!isValid || loading}>
//                     {loading ? <CircularProgress size={24} /> : "הרשמה"}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default SignUp;
