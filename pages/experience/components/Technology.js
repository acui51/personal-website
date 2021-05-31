import React from "react";
import { useTheme } from "next-themes";

export default function Technology({ children }) {
  const { theme } = useTheme();
  return (
    <div
      className="text-center border py-1 px-2 mr-2 mt-2"
      style={{
        borderColor: theme === "light" ? "#d7e0ea" : "gray",
        borderRadius: "99999px",
      }}
    >
      {children}
    </div>
  );
}
