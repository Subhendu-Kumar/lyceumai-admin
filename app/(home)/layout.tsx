"use client";

import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/context/auth/useAuth";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/signin");
    }
  }, [isLoggedIn, router, loading]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // prevents flicker while redirecting
  }

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-[calc(100vh-4rem)] overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
