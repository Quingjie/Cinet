import { PropsWithChildren } from "react";

export const ApplicationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: `
          "header header"
          "sidebar content"`,
        gridTemplateColumns: "240px 1fr",
        gridTemplateRows: "80px 1fr",
        height: "100vh",
      }}
    >
      {children}
    </div>
  );
};
