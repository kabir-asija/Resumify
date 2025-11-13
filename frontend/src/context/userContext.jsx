import React, { createContext, useEffect, useState } from "react";
import { axiosInstance } from "/src/utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    setLoading(false);
    return;
  }

  try {
    const decoded = jwtDecode(accessToken);
    if (decoded.exp * 1000 < Date.now()) {
      clearUser();
      setLoading(false);
      return;
    }

    // ✅ Set token globally in axios
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } catch (err) {
    // clearUser();
    setLoading(false);
    return;
  }

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      console.log("User fetched:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("User not authenticated", error);
      // clearUser(); // ✅ Clear user if token is invalid
      navigate("/")
    } finally {
      setLoading(false);
    }
  };

  
}, []);

const updateUser = (userData) => {
  setUser(userData);
  localStorage.setItem("token", userData.token);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`; // ✅
  setLoading(false);
};
  const clearUser = () => {
    setUser(null);
    navigate("/")
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
