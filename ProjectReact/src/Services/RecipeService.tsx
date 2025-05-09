import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const RecipeService = {
  getAllRecipes: async () => {
    const res = await axios.get(`${API_URL}/recipe`);
    return res.data;
  },

  deleteRecipe: async (id: number) => {
    const res = await axios.post(`${API_URL}/recipe/delete/${id}`);
    return res.data;
  }
};
