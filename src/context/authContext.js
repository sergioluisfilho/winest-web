import { createContext, useEffect, useState } from "react";
import api, { setAuthorizationToken } from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

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
      data: { user, jwt },
    } = await api.post("/auth/login", {
      email,
      password,
    });

    setToken(jwt);
    setAuthorizationToken(jwt);

    //TO DO
    setCurrentUser({
      ...user,
      profilePic: user.profilePictureUrl,
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};
