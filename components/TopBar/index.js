import Image from "next/image";

import Logo from "../Logo";
import SearchIcon from "../SearchIcon";

import styles from "./Styles.module.css";

export default function TopBar({ imageSrc }) {
  return (
    <div className={styles.main}>
      <div className={styles.navWrapper}>
        <Logo />
        <SearchIcon className={styles.searchIcon} size="32" />
      </div>

      <div className={styles.bannerImageWrapper}>
        <Image className={styles.bannerImage} src={imageSrc} layout="fill" />
      </div>
    </div>
  );
}
