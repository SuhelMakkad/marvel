import { useEffect, useRef } from "react";

import Image from "next/image";

import styles from "./Styles.module.css";

export default function BannerImage({ imageSrc }) {
  const immageWrapperRef = useRef(null);

  const handleScrollEvent = (e) => {
    if (!immageWrapperRef.current) return;

    const dmapingFactor = 0.3;
    immageWrapperRef.current.style.transform = `translateY(${window.scrollY * dmapingFactor}px)`;
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScrollEvent);

    return () => {
      document.removeEventListener("scroll", handleScrollEvent);
    };
  }, [imageSrc]);

  return (
    <div className={styles.main}>
      <div ref={immageWrapperRef} className={styles.bannerImageWrapper}>
        <Image className={styles.bannerImage} src={imageSrc} layout="fill" />
      </div>
      <div className={styles.gradient}></div>
    </div>
  );
}
