import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";

export const ApplicationLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname(); 
  if (pathname === "/login") {
    return <>{children}</>;
  }
  return (
    <div
      style={{
        display: "grid",
        flex :1,
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