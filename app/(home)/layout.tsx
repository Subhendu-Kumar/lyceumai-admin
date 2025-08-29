import Navbar from "@/components/navbar/Navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
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
