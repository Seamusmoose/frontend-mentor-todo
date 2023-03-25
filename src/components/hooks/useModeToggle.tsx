import { useState, useEffect } from "react";
import bgDayDark from "/public/bg-desktop-dark.jpg";
import bgDayLight from "/public/bg-desktop-light.jpg";
import bgDayMobileDark from "/public/bg-mobile-dark.jpg";
import bgDayMobileLight from "/public/bg-mobile-light.jpg";
import nightIcon from "/public/images/icon-moon.svg";
import dayIcon from "/public/images/icon-sun.svg";

interface backgroundColour {
  bgColor: string;
  containerColor: string;
  textColor: string;
}

export const useModeToggle = () => {
  const [toggleDarkMode, settoggleDarkMode] = useState(false);
  const [toggleIcon, settoggleIcon] = useState(dayIcon);
  const [togglebgImageLight, settogglebgImageLight] = useState(bgDayLight);
  const [togglebgImageDark, settogglebgImageDark] = useState(bgDayDark);
  const [backgroundColours, setbackgroundColours] = useState<backgroundColour>({
    bgColor: "",
    containerColor: "",
    textColor: "",
  });

  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (window.innerWidth >= 470) {
      settogglebgImageLight(bgDayLight);
    }

    if (window.innerWidth <= 470) {
      settogglebgImageLight(bgDayMobileLight);
    }

    if (isDark) {
      settoggleIcon(dayIcon);
      setbackgroundColours({
        bgColor: "hsla(235, 21%, 11%, 1)",
        containerColor: "hsla(235, 25%, 19%, 1)",
        textColor: "hsla(235, 39%, 85%, 1)",
      });
    }

    if (!isDark) {
      settoggleIcon(nightIcon);
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

  return { toggleDarkMode, toggleIcon, togglebgImageLight, togglebgImageDark, backgroundColours };
};
