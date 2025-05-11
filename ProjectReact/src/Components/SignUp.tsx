
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Designs/SignUp.css";
import { user } from "../Repositories/Types";
import { userContext } from "../Context/userContext";

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

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post<user>('http://localhost:8080/api/user/sighin',
        {
          UserName: data.username,
          Password: data.password,
          Name: data.name,
          Phone: data.phone,
          Email: data.email,
          Tz: data.tz,
        }
      );
      console.log('✅ המשתמש נרשם בהצלחה:', response.data);
      setMyUser({
        Id: response.data.Id,
        Password: response.data.Password,
        Name: response.data.Name,
        UserName: response.data.UserName,
        Phone: response.data.Phone,
        Email: response.data.Email,
        Tz: response.data.Tz
      });
      navigate('/Home');  // ניווט לאחר ההתחברות
    } catch (error: any) {
      if (error.response) {
        console.error("❌ שגיאת שרת:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("⚠️ שגיאת רשת: אין תגובה מהשרת");
      } else {
        console.error("🔴 שגיאה לא צפויה:", error.message);
      }
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












