import React, { createContext, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import mockApi from "../assets/mockApi";


const initialState = {
  user: null,
  setUser: () => {},

  login: async () => {},
  signup: async () => {},

  fetchUser: async () => {},
  isUserFetched: false,

  logout: () => {},

  onboardingCompleted: false,
  setOnboardingCompleted: () => {},

  allFoodLogs: [],
  setAllFoodLogs: () => {},

  allActivityLogs: [],
  setAllActivityLogs: () => {}
};

const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [allFoodLogs, setAllFoodLogs] = useState([]);
  const [allActivityLogs, setAllActivityLogs] = useState([]);

  const signup = async (credentials) => {
    const { data } = await mockApi.auth.register(credentials);
    setUser(data.user);

    if (data?.user.age && data?.user?.weight && data?.user?.goal) {
      setOnboardingCompleted(true);
    }

    localStorage.setItem("token", data.jwt);
  };

  const login = async (credentials) => {
    const { data } = await mockApi.auth.login(credentials);

    setUser({ ...data.user, token: data.jwt });

    if (data?.user.age && data?.user?.weight && data?.user?.goal) {
      setOnboardingCompleted(true);
    }

    localStorage.setItem("token", data.jwt);
  };

  const fetchUser = async (token) => {
    const { data } = await mockApi.user.me();

    setUser({ ...data, token });

    if (data?.age && data?.weight && data?.goal) {
      setOnboardingCompleted(true);
    }

    setIsUserFetched(true);
  };

  const fetchFoodLogs = async () => {
    const { data } = await mockApi.foodLogs.list();
    setAllFoodLogs(data);
  };

  const fetchActivityLogs = async () => {
    const { data } = await mockApi.activityLogs.list();
    setAllActivityLogs(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setOnboardingCompleted(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      (async () => {
        await fetchUser(token);
        await fetchFoodLogs();
        await fetchActivityLogs();
      })();
    } else {
      setIsUserFetched(true);
    }
  }, []);

  const value = {
    user,
    setUser,
    isUserFetched,
    fetchUser,
    signup,
    login,
    logout,
    onboardingCompleted,
    setOnboardingCompleted,
    allFoodLogs,
    allActivityLogs,
    setAllFoodLogs,
    setAllActivityLogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);