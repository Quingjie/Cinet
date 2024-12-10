import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../theme-provider";

export const ApplicationLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const { theme } = useTheme();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <div
      className={`grid flex-1 ${
        theme === 'dark' 
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