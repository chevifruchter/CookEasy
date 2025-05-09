import { makeAutoObservable, runInAction, toJS } from "mobx";
import axios from "axios";
import { Recipe } from "../Repositories/Types";

class RecipeStore {
  currRecipe: Recipe | null =
   {Id: 0, Name: "", Instructions: [{ Name: "" }], 
   Difficulty: 0, Duration: 0, 
   Description: "", UserId: 0,
   Categoryid: 0, Img: "", Ingridents: [],
   createdAt: "", updatedAt: ""}; 

  currImage: { [key: string]: string } = {};
  isLoading: boolean = false;
  successMessage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  // שליפת מתכון קיים לפי ID
  async fetchRecipe(recipeId: number) {
    this.isLoading = true;
    try {
      const response = await axios.get(`http://localhost:8080/api/recipe/${recipeId}`);
      runInAction(() => {
        this.currRecipe = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      console.error("❌ Error fetching recipe:", error);
      this.isLoading = false;
    }
  }
    getCurrentDateTime() {
    const now = new Date(); // יצירת אובייקט תאריך ושעה נוכחיים
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // חודשים מתחילים מ-0, לכן מוסיפים 1
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // פורמט: YYYY-MM-DD HH:mm:ss
  };
  // עדכון המתכון בשרת
  async updateRecipe() {
    if (!this.currRecipe) return;

    const plainRecipe = toJS(this.currRecipe);

    console.log("in mobix: ",plainRecipe);

    const formattedRecipe = {
      ...plainRecipe,
      Id: Number(plainRecipe.Id),
      Duration: Number(plainRecipe.Duration),
      Categoryid: Number(plainRecipe.Categoryid),
      UserId: Number(plainRecipe.UserId),
      CategoryId: Number(plainRecipe.Categoryid),
      updatedAt:String(this.getCurrentDateTime()),
    };
    console.log("Sending to server:", formattedRecipe);
    try {
      await axios.post<Recipe>('http://localhost:8080/api/recipe/edit', formattedRecipe);
      runInAction(() => {
        alert("המתכון עודכן בהצלחה!");
        this.successMessage = "🎉 המתכון עודכן בהצלחה!";
      });
    } catch (error) {
      console.error("❌ Error updating recipe:", error);
    console.log("in mobix: ",plainRecipe);
      alert("שגיאה בעדכון המתכון");
    }
  }

  // שינוי נתוני המתכון בסטייט
  setRecipe(recipe: Recipe) {
    this.currRecipe = recipe;
  }

  // עדכון שדה בודד במתכון
  updateField(field: string, value: any) {
    if (this.currRecipe) {
      this.currRecipe = { ...this.currRecipe, [field]: value };
    }
  }

  // איפוס הודעת הצלחה
  clearSuccessMessage() {
    this.successMessage = "";
  }
}

export default new RecipeStore();
