import {
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext =
  createContext<ThemeContextType>({
    theme: "light",
    setTheme: () => {},
    toggleTheme: () => {},
  });

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const getDefaultTheme = (): Theme => {
    if (typeof window === "undefined")
      return "light";

    const saved =
      localStorage.getItem("theme");

    if (
      saved === "light" ||
      saved === "dark"
    )
      return saved;

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] =
    useState<Theme>(getDefaultTheme);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () =>
        setTheme((prev) =>
          prev === "dark"
            ? "light"
            : "dark"
        ),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}