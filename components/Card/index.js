import Image from "next/image";
import Link from "next/link";

import styles from "./Styles.module.css";

export default function Card({ src, title, description, href, showIfImageAvaialbe = false }) {
  if (showIfImageAvaialbe && src?.includes("image_not_available")) {
    return "";
  }

  return src ? (
    <div className={styles.imageWrapper}>
      <Image height={324} width={216} alt={title} layout="intrinsic" src={src} />
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  ) : (
    ""
  );
}

export function LoadingCard() {
  return <div className={`${styles.loadingCard} ${styles.animateLoading}`}></div>;
}
