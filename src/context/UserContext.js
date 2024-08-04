import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../api/Api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      console.log(id)
      getMe(id).then((data) => {
        console.log(data)
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
