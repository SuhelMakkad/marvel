import { useEffect, useRef } from "react";

import Image from "next/image";

import styles from "./Styles.module.css";

export default function BannerImage({ title, description, imageSrc, show = true }) {
  const immageWrapperRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleScrollEvent = () => {
    if (immageWrapperRef.current) {
      const dmapingFactor = 0.3;
      immageWrapperRef.current.style.transform = `translateY(${window.scrollY * dmapingFactor}px)`;
    }

    if (titleRef.current) {
      const dmapingFactor = -0.25;
      titleRef.current.style.transform = `translateY(${window.scrollY * dmapingFactor}px)`;
    }

    if (descriptionRef.current) {
      const dmapingFactor = -0.15;
      descriptionRef.current.style.transform = `translateY(${window.scrollY * dmapingFactor}px)`;
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScrollEvent);

    return () => {
      document.removeEventListener("scroll", handleScrollEvent);
    };
  }, [imageSrc]);

  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <h2 ref={titleRef} className={styles.title}>
          {title}
        </h2>
        <p ref={descriptionRef} className={styles.description}>
          {description}
        </p>
      </div>

      <div ref={immageWrapperRef} className={styles.bannerImageWrapper}>
        {show && imageSrc ? (
          <Image className={styles.bannerImage} src={imageSrc} layout="fill" />
        ) : (
          ""
        )}
      </div>

      <div className={styles.gradient}></div>
    </div>
  );
}
