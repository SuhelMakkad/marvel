import Link from "next/link";

import styles from "./Styles.module.css";

export default function Logo({ onClick, href = "/" }) {
  return (
    <Link href={href} onClick={onClick} className={styles.marvelLogo}>
      MARVEL
    </Link>
  );
}
