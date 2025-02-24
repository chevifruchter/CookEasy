export type user = {
    Username: string,
    Password:string,
    Name: string,
    Phone: string,
    Email:string,
    Tz: string,
    Id: number|null
}

export type Ingrident= {

    Name :string
    Count :number
    Type:string

}

export type recipe = {
    Id:number,
    name: string,
    Difficulty: 'low'|'medium'|'high',
    Duration: number,
    Instructions:[{Name:""}],
    Img:string,
    Ingridient:Ingrident,
    UserId: number,
    categoryId: number,
    Description: string
}

export type category = {
    Id:number,
    Name:string
}