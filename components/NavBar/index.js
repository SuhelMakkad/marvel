import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Styles.module.css";

export default function NavBar() {
  const router = useRouter();

  const checkActiveClass = (path) => {
    const asPath = router.asPath;

    if (asPath === `/${path}`) {
      return styles.active;
    }

    if (asPath.includes(`/${path}/`)) {
      return styles.subActive;
    }

    return "";
  };
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${checkActiveClass("characters")}`}>
          <Link href="/characters">
            <a>characters</a>
          </Link>
        </li>
        <li className={`${styles.navItem} ${checkActiveClass("movies")}`}>
          <Link href="/movies">
            <a>movies</a>
          </Link>
        </li>
        <li className={`${styles.navItem} ${checkActiveClass("tv-shows")}`}>
          <Link href="/tv-shows">
            <a>tv shows</a>
          </Link>
        </li>
        <li className={`${styles.navItem} ${checkActiveClass("comics")}`}>
          <Link href="/comics">
            <a>comics</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
