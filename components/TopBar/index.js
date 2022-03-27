import Image from "next/image";

import Logo from "../Logo";
import SearchIcon from "../SearchIcon";

import styles from "./Styles.module.css";

export default function TopBar({ margin = false }) {
  return (
    <div style={{ marginBottom: `${margin ? "5rem" : ""}` }} className={styles.main}>
      <div className={styles.navWrapper}>
        <Logo />
        <SearchIcon className={styles.searchIcon} size="32" />
      </div>
    </div>
  );
}
