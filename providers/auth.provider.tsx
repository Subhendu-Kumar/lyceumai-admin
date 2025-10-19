"use client";

import axios from "axios";
import { User } from "@/types/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { BASE_URL, getToken, removeToken, setToken } from "@/lib/utils";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (token) {
          const res1 = await axios.get(`${BASE_URL}/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res1.data) {
            const res = await axios.get(`${BASE_URL}/auth/user`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(res.data);
            setIsLoggedIn(true);
            setToken(res.data.token);
            setAccessToken(res.data.token);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuth().finally(() => setLoading(false));
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      await axios.post(`${BASE_URL}/auth/signup`, {
        name,
        email,
        password,
        role: "TEACHER",
      });
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        setUser(res.data);
        setIsLoggedIn(true);
        setToken(res.data.token);
        setAccessToken(res.data.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    removeToken();
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        signUp,
        signIn,
        signOut,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
