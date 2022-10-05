import React, { useState } from "react";

const AuthContext = React.createContext({
  //token: "",
  user: "",
  isLoggedIn: false,
  //login: (userdata: any, token: string, expirationTime: string) => {},
  login: (userdata: any, expirationTime: string) => {},
  logout: () => {},
});

/*const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return 20000;
};*/

export const AuthContextProvider = (props: any) => {
  //const initialToken = localStorage.getItem("token") || "";
  const initialUser = localStorage.getItem("user") || "";
  //const [token, setToken] = useState(initialToken);
  const [userData, setUserData] = useState(initialUser);
  //const userIsLoggedIn = !!token;
  const userIsLoggedIn = !!userData;
  //const userHasData = !!user;

  const logoutHandler = () => {
    //setToken("");
    setUserData("");
    //localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const loginHandler = (
    user: any,
    //token: string,
    expirationTime: string
  ) => {
    //setToken(token);
    setUserData(user);
    localStorage.setItem("user", JSON.stringify(user));
    //localStorage.setItem("token", token);

    //const remainingTime = calculateRemainingTime(expirationTime);
    //setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    //token: token,
    user: userData,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
