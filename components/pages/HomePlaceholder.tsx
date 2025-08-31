/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const HomePlaceholder = () => {
  return (
    <main className="flex flex-col items-center justify-center h-full bg-white relative">
      {/* Illustration */}
      <div className="flex flex-col items-center space-y-6">
        <img
          src="/empty_states_home.svg" // 🔹 Replace with your illustration
          alt="No classes"
          className="h-48 w-auto"
        />
        {/* Message */}
        <p className="text-gray-700 text-center">
          All of your classes have been archived
        </p>

        {/* Actions */}
        <Link href="/create_class">
          <Button className=" px-6 py-2 custom-btn">Create class</Button>
        </Link>
      </div>

      {/* Extra info (top right corner) */}
      <div className="absolute top-6 right-6 text-sm flex flex-col items-center justify-center text-gray-500">
        <img
          src="/create_class_arrow.svg"
          alt="create class arrow"
          className="h-16 w-auto"
        />
        <p className="text-right">
          Don’t see your classes? <br />
          <span className="cursor-pointer hover:text-gray-700">
            Try another account
          </span>
        </p>
      </div>
    </main>
  );
};

export default HomePlaceholder;
