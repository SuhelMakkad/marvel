import Link from "next/link";
import styles from "./Styles.module.css";

export default function TopBar() {
  return (
    <Link href="/">
      <a className={styles.topBar} data-title="marvel"></a>
    </Link>
  );
}
