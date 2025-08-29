/* eslint-disable @next/next/no-img-element */
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white relative">
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
        <div className="flex space-x-6">
          <button className="text-blue-600 hover:underline font-medium">
            Create class
          </button>
          <button className="bg-blue-600 text-white font-medium px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Join class
          </button>
        </div>
      </div>

      {/* Extra info (top right corner) */}
      <div className="absolute top-6 right-6 text-sm text-gray-500">
        <p className="text-right">
          Don’t see your classes? <br />
          <span className="underline cursor-pointer hover:text-gray-700">
            Try another account
          </span>
        </p>
      </div>
    </main>
  );
};

export default Home;
