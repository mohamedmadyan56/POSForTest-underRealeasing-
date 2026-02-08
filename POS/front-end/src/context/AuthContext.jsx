import { createContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext(); // ✅ export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/users/getMe")
      .then((res) => setUser(res.data.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await API.post("/users/signup", { name, email, password });
      setUser(res.data.data.user);
    } catch (err) {
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/users/login", { email, password });
      setUser(res.data.data.user);
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.get("/users/logout");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
