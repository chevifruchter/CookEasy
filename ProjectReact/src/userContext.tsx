import { createContext ,ReactElement,useEffect,useState} from "react";
import { user } from "./Types";

type typeContext = {
    MyUser: user | null;
    setMyUser: (MyUser: any) => void
}

export const userContext = createContext<typeContext>({
    MyUser: null,
    setMyUser: (_: any) => { }
});

const UserContext = ({children}:{children:ReactElement})=>{
    const [user, setUser] = useState<user | null>(null);

    useEffect(() => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
  }, []);

  // פונקציה שמעדכנת גם את ה-state וגם את localStorage
  const setMyUser = (user: user | null) => {
    setUser(user);
      if (user) {
          localStorage.setItem("user", JSON.stringify(user));
      } else {
          localStorage.removeItem("user");
      }
  };

    return (
        <userContext.Provider value={{ MyUser: user, setMyUser }}>
          {children}
        </userContext.Provider>
      );
}

export default UserContext;