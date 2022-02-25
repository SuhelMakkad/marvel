import Link from "next/link";
import classes from "../styles/NavBar.module.css";

export default function NavBar({ pageName }) {
  return (
    <>
      <nav className={classes.navbar}>
        <ul className={classes.navList}>
          <li className={classes.navItem + " " + (pageName === "characters" ? classes.active : "")}>
            <Link href="/characters">
              <a>characters</a>
            </Link>
          </li>
          <li className={classes.navItem + " " + (pageName === "movies" ? classes.active : "")}>
            <Link href="/movies">
              <a>movies</a>
            </Link>
          </li>
          <li className={classes.navItem + " " + (pageName === "tv shows" ? classes.active : "")}>
            <Link href="/tv-shows">
              <a>tv shows</a>
            </Link>
          </li>
          <li className={classes.navItem + " " + (pageName === "comics" ? classes.active : "")}>
            <Link href="/comics">
              <a>comics</a>
            </Link>
          </li>
        </ul>

        <div className={classes.searchWrapper}>
          <input className={classes.search} type="text" id="search" placeholder="Search" autoComplete="off" />
          <label className={classes.searchLable} htmlFor="search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              width="24px"
              viewBox="0 0 24 24"
              fill="#000000">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </label>
        </div>
      </nav>
    </>
  );
}
