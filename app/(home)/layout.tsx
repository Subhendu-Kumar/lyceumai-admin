"use client";

import Image from "next/image";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn, loading, user, signOut } = useAuth();

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

  if (user?.role !== "TEACHER") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Card className="w-full max-w-md text-center shadow-lg rounded-2xl p-6">
          <CardHeader>
            <Image
              width={400}
              height={400}
              className="mx-auto"
              alt="Access denied"
              src="/access-denied.png"
            />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              You don’t have access to this portal because you are not a
              teacher.
            </p>
            <Button className="custom-btn w-full" onClick={signOut}>
              Sign in with a different account
            </Button>
          </CardContent>
        </Card>
      </div>
    );
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
