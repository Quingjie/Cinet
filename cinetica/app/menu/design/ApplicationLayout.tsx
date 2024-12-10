import { PropsWithChildren, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const ApplicationLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Vérifie le mode sombre au chargement
    const checkDarkMode = () => {
      return localStorage.theme === 'dark' || 
             (!(localStorage.theme) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    };
    
    setIsDarkMode(checkDarkMode());

    // Écoute les changements de préférence système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setIsDarkMode(checkDarkMode());
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div
      className={`grid flex-1 ${
        isDarkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-white text-black'
      }`}
      style={{
        gridTemplateAreas: `
          "header header"
          "sidebar content"`,
        gridTemplateColumns: "240px 1fr",
        gridTemplateRows: "80px 1fr"
      }}
    >
      {children}
    </div>
  );
};