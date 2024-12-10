'use client';

import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTheme } from "../theme-provider";

export const Content = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    // Redirect to /login if user is not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading message while session status is being verified
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Show content if user is authenticated
  if (session) {
    return (
      <div
        className={`
          p-6 
          ${theme === 'dark' 
            ? 'bg-gray-900 text-white' 
            : 'bg-white text-black'}
        `}
        style={{ gridArea: "content" }}
      >
        {children}
      </div>
    );
  }

  // Optional: Display nothing if user is not authenticated
  return null;
};