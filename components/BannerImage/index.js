import { useState, useEffect, useRef } from "react";

import Image from "next/image";

import styles from "./Styles.module.css";
import Link from "next/link";

export default function BannerImage({ title, description, href, imageSrc, show = true }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

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
        <Link href={href || "/"}>
          <a>
            <h2 ref={titleRef} className={styles.title}>
              {title}
            </h2>
          </a>
        </Link>
        <p
          ref={descriptionRef}
          onClick={() => setShowFullDescription((prev) => !prev)}
          className={`${styles.description} ${showFullDescription ? styles.showFullText : ""}`}
        >
          {description}
        </p>
      </div>

      <div ref={immageWrapperRef} className={styles.bannerImageWrapper}>
        {show && imageSrc ? (
          <Image className={styles.bannerImage} src={imageSrc} layout="fill" objectFit="cover" />
        ) : (
          ""
        )}
      </div>

      <div className={styles.gradient}></div>
    </div>
  );
}
