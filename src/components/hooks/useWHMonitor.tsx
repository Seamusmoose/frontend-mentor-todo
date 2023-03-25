import { useEffect, useState } from "react";

export const useWHMonitor = () => {
  const [toggleLinkLayout, settoggleLinkLayout] = useState(false);

  useEffect(() => {
    function handleResize() {
      settoggleLinkLayout(window.innerWidth >= 600);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { toggleLinkLayout };
};
