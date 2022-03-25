import { useState, useEffect, useRef } from "react";

export default function useElementOnScreen(options) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const callback = (entires) => {
    const [entry] = entires;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    options = options || {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observe = new IntersectionObserver(callback, options);
    if (containerRef.current) {
      observe.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observe.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
}
