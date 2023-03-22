import { useState, useEffect } from "react";

import bgDayDark from "/public/bg-desktop-dark.jpg";
import bgDayLight from "/public/bg-desktop-light.jpg";
import bgDayMobileDark from "/public/bg-mobile-dark.jpg";
import bgDayMobileLight from "/public/bg-mobile-light.jpg";
import nightIcon from "/public/images/icon-moon.svg";
import dayIcon from "/public/images/icon-sun.svg";

export const useTheme = () => {
  const [toggleDarkMode, settoggleDarkMode] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (window.innerWidth >= 470) {
      settogglebgImageLight(bgDayLight);
    }

    if (window.innerWidth <= 470) {
      settogglebgImageLight(bgDayMobileLight);
    }

    if (toggleDarkMode) {
      settoggleIcon(nightIcon);
    }

    if (!toggleDarkMode) {
      settoggleIcon(dayIcon);
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
      const isLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      if (isDark) {
        settoggleIcon(nightIcon);
        settoggleDarkMode(true);
      }

      if (isLight) {
        settoggleIcon(dayIcon);
        settoggleDarkMode(false);
      }
    });
    return () => clearInterval(interval);
  }, [toggleDarkMode]);

  return { toggleDarkMode, toggleIcon, togglebgImageLight, togglebgImageDark };
};
