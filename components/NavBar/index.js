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
          <Link href="/characters">characters</Link>
        </li>
        <li className={`${styles.navItem} ${checkActiveClass("comics")}`}>
          <Link href="/comics">comics</Link>
        </li>
        <li className={`${styles.navItem} ${checkActiveClass("series")}`}>
          <Link href="/series">series</Link>
        </li>
        <li className={`${styles.navItem} ${checkActiveClass("events")}`}>
          <Link href="/events">events</Link>
        </li>
      </ul>
    </nav>
  );
}
