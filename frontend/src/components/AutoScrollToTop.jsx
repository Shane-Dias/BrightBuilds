import { useEffect } from "react";

const AutoScrollToTop = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []); 

  return null; 
};

export default AutoScrollToTop;
