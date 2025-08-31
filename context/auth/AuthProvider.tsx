"use client";

import axios from "axios";
import { User } from "@/types/auth";
import { BASE_URL } from "@/lib/utils";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // when website stars
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
    // Implement sign-in logic here
  };

  const signOut = async () => {
    // Implement sign-out logic here
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
