import axios from "axios";
import { useState } from "react";
import { Category } from "../Repositories/Types";




export const FilterService = {

    fetchCategory: async () => {
      const [categories, setCategories] = useState<Category[]>([]);

        try {
            const res = await axios.get<Category[]>('http://localhost:8080/api/category');
            setCategories(res.data);
        } catch (err) {
            console.error("שגיאה בטעינת קטגוריות", err);
        }
    },
}