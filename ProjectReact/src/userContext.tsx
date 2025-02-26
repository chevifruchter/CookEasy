
import { createContext, ReactElement, useEffect, useState } from "react";
import { recipe, user } from "./Types";
import AllRecipes from "./Components/AllRecipes";

type typeContext = {
    MyUser: user | null,
    setMyUser: (MyUser: user | null) => void,
    // myRecipe: recipe|null,
    // setMyRecipe: (recipe:recipe|null)=>void;
};

export const userContext = createContext<typeContext>({
    MyUser: null,
    setMyUser: () => {},
    // myRecipe: null,
    // setMyRecipe: ()=>{}
});

const UserContext = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<user | null>(null);

    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const setMyUser = (user: user | null) => {
        setUser(user);
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    };

    return (
        <userContext.Provider value={{ MyUser: user, setMyUser}}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
