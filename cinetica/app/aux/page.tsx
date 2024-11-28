"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
        className="p-4 bg-blue-500 text-white rounded"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </div>
  );
}
