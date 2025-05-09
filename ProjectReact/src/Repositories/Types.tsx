
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

// export type Ingrident= {

//     Name :string
//     Count :number
//     Type:string

// }

// export type recipe = {
//     Id:number,
//     name: string,
//     Difficulty: 'low'|'medium'|'high',
//     Duration: number,
//     Instructions:[{Name: ""}],
//     Img:string,
//     Ingridient:Ingredient[],
//     UserId: any,
//     categoryId: number,
//     Description: string
// }

// export type category = {
//     Id:number|null,
//     Name:string
// }



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
// !Id || !Name || !UserId || !Categoryid ||
//  !Img || !Duration || !Difficulty ||
//  !Description || !Ingridents || !Instructions
export type Recipe = {
    Id: number;
    Name: string;
    UserId: number;
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
    Instructions: {Name: string}[]
}

export default RecipeType;
