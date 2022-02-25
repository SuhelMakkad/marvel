import Link from "next/link";
import classes from "../styles/TopBar.module.css";

export default function TopBar() {
  return (
    <Link href="/">
      <a className={classes.topBar} data-title="marvel"></a>
    </Link>
  );
}
