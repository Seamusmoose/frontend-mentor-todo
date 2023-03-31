import { useState, useEffect } from "react";
import bgDayDark from "/public/bg-desktop-dark.jpg";
import bgDayLight from "/public/bg-desktop-light.jpg";
import bgDayMobileDark from "/public/bg-mobile-dark.jpg";
import bgDayMobileLight from "/public/bg-mobile-light.jpg";
import nightIcon from "/public/images/icon-moon.svg";
import dayIcon from "/public/images/icon-sun.svg";
import { useTheme } from "next-themes";

export const useModeToggle = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);

  const { theme, setTheme } = useTheme();

  useEffect(() => {}, []);

  useEffect(() => {
    if (window.innerWidth >= 470) {
      settogglebgImageLight(bgDayLight);
    }

    if (window.innerWidth <= 470) {
      settogglebgImageLight(bgDayMobileLight);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 600) {
        settogglebgImageLight(bgDayLight);
        settogglebgImageDark(bgDayDark);
      }

      if (window.innerWidth <= 600) {
        settogglebgImageLight(bgDayMobileLight);
        settogglebgImageDark(bgDayMobileDark);
      }
    });

    const interval = setInterval(() => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

      if (isDark || theme === "dark") {
        settoggleIcon(dayIcon);
        setdarkMode(true);
      } else if (isLight || theme === "light") {
        settoggleIcon(nightIcon);
        setdarkMode(false);
      }

      // if (theme === "dark") {
      //   console.log("theme dark");
      //   settoggleIcon(dayIcon);
      //   setdarkMode(true);
      // } else if (theme === "light") {
      //   settoggleIcon(nightIcon);
      //   setdarkMode(false);
      // }
    });

    return () => clearInterval(interval);
  }, [darkMode, theme]);

  return {
    darkMode,
    toggleIcon,
    togglebgImageLight,
    togglebgImageDark,
    theme,
    setTheme,
  };
};
