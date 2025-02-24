import { Children, createContext, useContext ,ReactElement,useState} from "react";
import { user } from "./Types";

type typeContext = {
    MyUser: user | null;
    setMyUser: (MyUser: user) => void
}

export const userContext = createContext<typeContext>({
    MyUser: null,
    setMyUser: (_: user) => { }
});

const UserContext = ({children}:{children:ReactElement})=>{
    const [user, setUser] = useState<user | null>(null);

    const setMyUser = (user: user) => {
      setUser(user);
    }

    return (
        <userContext.Provider value={{ MyUser: user, setMyUser }}>
          {children}
        </userContext.Provider>
      );
}

export default UserContext;