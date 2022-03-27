import Image from "next/image";

import styles from "./Styles.module.css";

export default function ItemDetails({ imageSrc, title, description }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageSection}>
        {imageSrc ? (
          <Image
            width={550}
            height={550}
            alt={"title"}
            layout="intrinsic"
            src={imageSrc}
            objectFit="cover"
          />
        ) : (
          ""
        )}
      </div>

      <div className={styles.textSection}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
