import React from "react";
import { Menu, Plus, GraduationCap } from "lucide-react"; // icons
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full h-16 bg-blue-50 shadow-sm">
      <div className="flex h-full w-full items-center justify-between px-4 py-2">
        {/* Left section */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-indigo-600" /> {/* Logo */}
            <span className="text-lg font-semibold text-gray-800">
              Lyceum AI
            </span>
          </Link>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <Link
            href="/create_class"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Plus className="h-6 w-6 text-gray-700" />
          </Link>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-bold cursor-pointer">
            A {/* 🔹 First letter of username, replace dynamically */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
