import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/theme-provider";
import { Button } from "./button";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="w-10 h-10 rounded-md"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </Button>
  );
};
