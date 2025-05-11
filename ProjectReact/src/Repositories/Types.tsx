
export type userLogin = {
    UserName: string,
    Password: string
}

export type user = {
    UserName: string,
    Password: string,
    Name: string,
    Phone: string,
    Email: string,
    Tz: string,
    Id: number | null
}

type RecipeType = {
    Id: number,
    Name: string,
    Instructions: [{ Name: "" }],
    Difficulty: "hard" | "medium" | "easy",
    Duration: number,
    Description: string,
    UserId: number,
    Categoryid: number,
    Img: string,
    Ingridents: Ingredient[],
    createdAt: string,
    updatedAt: string,
}
export interface Ingredient {
    Name: string;
    Count: number;
    Type: string;
}

export interface Instruction {
    Name: string;
    RecipeId?: number;
}
export type Recipe = {
    Id: number;
    Name: string;
    UserId: number | null | undefined;
    Categoryid: number;
    Img: string;
    Duration: number;
    Difficulty: number;
    Description: string;
    Ingridents: Ingredient[];
    Instructions: Instruction[];
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    Id: number;
    Name: string;
}

export interface CategoryRes {
    Id: number;
    Name: string;
    UpdatedAt: string;
    CreatedAt: string;
}


export type RecipeToAdd = {
    Name: string,
    Img: string,
    UserId: string,
    Categoryid: number,
    Duration: number,
    Difficulty: number,
    Description: string,
    Ingridents: Ingredient[],
    Instructions: { Name: string }[]
}

export default RecipeType;
