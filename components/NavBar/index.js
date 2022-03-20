import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Styles.module.css";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li
          className={styles.navItem + " " + (router.asPath === "/characters" ? styles.active : "")}
        >
          <Link href="/characters">
            <a>characters</a>
          </Link>
        </li>
        <li className={styles.navItem + " " + (router.asPath === "/movies" ? styles.active : "")}>
          <Link href="/movies">
            <a>movies</a>
          </Link>
        </li>
        <li className={styles.navItem + " " + (router.asPath === "/tv-shows" ? styles.active : "")}>
          <Link href="/tv-shows">
            <a>tv shows</a>
          </Link>
        </li>
        <li className={styles.navItem + " " + (router.asPath === "/comics" ? styles.active : "")}>
          <Link href="/comics">
            <a>comics</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
