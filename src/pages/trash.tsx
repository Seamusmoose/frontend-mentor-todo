

export const trash = () => {
  return (
    <div>trash</div>
  )
}

  // useEffect(() => {
  //   const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   if (window.innerWidth >= 600) {
  //     settoggleLinkLayout(true);
  //   }

  //   if (window.innerWidth <= 600) {
  //     settoggleLinkLayout(false);
  //   }

  //   if (window.innerWidth >= 470) {
  //     settogglebgImageLight(bgDayLight);
  //   }

  //   if (window.innerWidth <= 470) {
  //     settogglebgImageLight(bgDayMobileLight);
  //   }

  //   if (isDark) {
  //     settoggleIcon(nightIcon);
  //   }

  //   if (!isDark) {
  //     settoggleIcon(dayIcon);
  //   }

  //   window.addEventListener("resize", () => {
  //     if (window.innerWidth >= 600) {
  //       settoggleLinkLayout(true);
  //     }

  //     if (window.innerWidth <= 600) {
  //       settoggleLinkLayout(false);
  //     }

  //     if (window.innerWidth >= 600) {
  //       settogglebgImageLight(bgDayLight);
  //       settogglebgImageDark(bgDayDark);
  //     }

  //     if (window.innerWidth <= 600) {
  //       settogglebgImageLight(bgDayMobileLight);
  //       settogglebgImageDark(bgDayMobileDark);
  //     }
  //   });

  //   const interval = setInterval(() => {
  //     const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  //     if (isDark) {
  //       settoggleIcon(nightIcon);
  //       settoggleDarkMode(true);
  //     }

  //     if (!isDark) {
  //       settoggleIcon(dayIcon);
  //       settoggleDarkMode(false);
  //     }
  //   });
  //   return () => clearInterval(interval);
  // }, []);