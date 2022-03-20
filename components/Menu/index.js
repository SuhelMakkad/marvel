import { useRef } from "react";

import Link from "next/link";

import styles from "./Styles.module.css";

function Menu() {
  const menuBars = useRef();
  const fullMenuWrapper = useRef();

  const toggleMenu = () => {
    if (menuBars.current.classList.contains(styles.open)) {
      menuBars.current.classList.remove(styles.open);
      fullMenuWrapper.current.classList.remove(styles.open);
      fullMenuWrapper.current.classList.add(styles.close);
    } else {
      menuBars.current.classList.add(styles.open);
      fullMenuWrapper.current.classList.add(styles.open);
      fullMenuWrapper.current.classList.remove(styles.close);
    }
  };

  return (
    <>
      <div className={styles.menu} onClick={toggleMenu}>
        <div ref={menuBars} className={styles.menuBars}></div>
      </div>
      <div ref={fullMenuWrapper} className={styles.fullMenuWrapper}>
        <div className={styles.menuListWrapper}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Link href="/characters">
                <a>characters</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/movies">
                <a>movies</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/tv-shows">
                <a>tv shows</a>
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link href="/comics">
                <a>comics</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
