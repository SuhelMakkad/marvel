import Image from "next/image";
import Link from "next/link";

import styles from "./Styles.module.css";

export default function Card({ src, title, description, href }) {
  return src ? (
    <Link href={href}>
      <a>
        <div className={styles.imageWrapper}>
          <Image height={324} width={216} layout="intrinsic" src={src} />
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </a>
    </Link>
  ) : (
    ""
  );
}
