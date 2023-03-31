import Image from "next/image";
import { useTheme } from "next-themes";

function ThemedImage() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "light.jpg";
      break;
    case "dark":
      src = "dark.jpg";
      break;
    default:
      src = "light";
      break;
  }

  return src;
}
