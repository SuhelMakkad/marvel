import Image from "next/image";

import styles from "./Styles.module.css";

export default function Card({ src, title, description }) {
  return src ? (
    <div className={styles.imageWrapper}>
      <Image height={324} width={216} layout="intrinsic" src={src} />
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  ) : (
    ""
  );
}
