
import { createContext, ReactElement, useEffect, useState } from "react";
import { Recipe, user } from "../Repositories/Types";
// import AllRecipes from "./Components/AllRecipes";

type typeContext = {
    MyUser: user | null,
    setMyUser: (MyUser: user | null) => void,
    users: user[] | null,
    setusers: (users: user[] | null) => void;
};

export const userContext = createContext<typeContext>({
    MyUser: null,
    setMyUser: () => { },
    users: null,
    setusers: () => { }
});

const UserContext = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<user | null>(null);
    const [users, setUsers] = useState<user[] | null>(null);
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
    const setusers = (users: user[] | null) => {
        setUsers(users)
    }
    return (
        <userContext.Provider value={{ MyUser: user, setMyUser, users, setusers }}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;
