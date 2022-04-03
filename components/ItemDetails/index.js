import Image from "next/image";

import styles from "./Styles.module.css";

export default function ItemDetails({ imageSrc, title, description }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection}>
        {imageSrc ? <Image alt={title} layout="fill" src={imageSrc} objectFit="contain" /> : ""}
      </div>

      <div className={styles.textSection}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description || "No description available"}</p>
      </div>
    </div>
  );
}
