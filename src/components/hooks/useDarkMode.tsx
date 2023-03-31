import { useState, useEffect } from "react";
import bgDayDark from "/public/bg-desktop-dark.jpg";
import bgDayLight from "/public/bg-desktop-light.jpg";
import bgDayMobileDark from "/public/bg-mobile-dark.jpg";
import bgDayMobileLight from "/public/bg-mobile-light.jpg";
import nightIcon from "/public/images/icon-moon.svg";
import dayIcon from "/public/images/icon-sun.svg";
import { useTheme } from "next-themes";

export const useDarkMode = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (mounted) {
    const themefromLocal: any = localStorage.getItem("theme");
    console.log(themefromLocal);

    setTheme(themefromLocal);
  }

  return {
    darkMode,
    toggleIcon,
    togglebgImageLight,
    togglebgImageDark,
    theme,
    setTheme,
  };
};
