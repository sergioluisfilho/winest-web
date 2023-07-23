import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    console.log(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async ({ email, password }) => {
    console.table({
      email,
      password,
    });
    const {
      data: { user },
    } = await axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    });

    //TO DO
    setCurrentUser({
      ...user,
      profilePic: user.profilePictureUrl,
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
