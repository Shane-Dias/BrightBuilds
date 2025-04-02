import { useEffect } from "react";

const AutoScrollToTop = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []); // Runs only once when the component mounts

  return null; // No UI needed
};

export default AutoScrollToTop;
