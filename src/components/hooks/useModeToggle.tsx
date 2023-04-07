import { useState, useEffect } from "react";
import bgDayDark from "/public/images/bg-desktop-dark.jpg";
import bgDayLight from "/public/images/bg-desktop-light.jpg";
import bgDayMobileDark from "/public/images/bg-mobile-dark.jpg";
import bgDayMobileLight from "/public/images/bg-mobile-light.jpg";

import nightIcon from "/public/icon-moon.svg";
import dayIcon from "/public/icon-sun.svg";
import { useTheme } from "next-themes";

export const useModeToggle = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);
  const [buttonSize, setbuttonSize] = useState<string>();
  const [checkSize, setcheckSize] = useState<string>();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (window.innerWidth >= 470) {
      settogglebgImageLight(bgDayLight);
      setbuttonSize("button-size");
      setcheckSize("check-size");
    }

    if (window.innerWidth <= 470) {
      settogglebgImageLight(bgDayMobileLight);
      settogglebgImageDark(bgDayMobileDark);
      setbuttonSize("button-size-mobile");
      setcheckSize("check-size-mobile");
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
    });

    return () => clearInterval(interval);
  }, [darkMode, theme, toggleIcon]);

  return {
    darkMode,
    toggleIcon,
    togglebgImageLight,
    togglebgImageDark,
    theme,
    setTheme,
    buttonSize,
    checkSize,
  };
};
