import Link from "next/link";

import styles from "./Styles.module.css";

export default function Logo({ onClick, href = "/" }) {
  return (
    <Link href={href}>
      <a>
        <button onClick={onClick} className={styles.marvelLogo}>
          MARVEL
        </button>
      </a>
    </Link>
  );
}
