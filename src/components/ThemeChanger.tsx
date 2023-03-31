import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useModeToggle } from "@/components/hooks/useModeToggle";

const ThemeChanger = () => {
  // const { toggleIcon } = useModeToggle();
  // const [mounted, setMounted] = useState(false);
  // const { theme, setTheme } = useTheme();

  // useEffect(() => {
  //   if (mounted) {
  //     console.log(window.localStorage.getItem("theme"), "theme");
  //   }
  // }, [mounted, theme]);


  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null;
  // }

  // return (
  //   <button
  //     value={theme}
  //     className="test"
  //     onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  //   >
  //     <Image src={toggleIcon} width={50} height={50} alt="" />
  //   </button>
  // );
};

export default ThemeChanger;
