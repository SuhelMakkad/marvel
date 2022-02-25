import classes from "../styles/Menu.module.css";
import { useRef } from "react";
import Link from "next/link";

function Menu() {
  const menuBars = useRef();
  const fullMenuWrapper = useRef();

  const toggleMenu = () => {
    if (menuBars.current.classList.contains(classes.open)) {
      menuBars.current.classList.remove(classes.open);
      fullMenuWrapper.current.classList.remove(classes.open);
      fullMenuWrapper.current.classList.add(classes.close);
    } else {
      menuBars.current.classList.add(classes.open);
      fullMenuWrapper.current.classList.add(classes.open);
      fullMenuWrapper.current.classList.remove(classes.close);
    }
  };

  return (
    <>
      <div className={classes.menu} onClick={toggleMenu}>
        <div ref={menuBars} className={classes.menuBars}></div>
      </div>
      <div ref={fullMenuWrapper} className={classes.fullMenuWrapper}>
        <div className={classes.menuListWrapper}>
          <ul className={classes.menuList}>
            <li className={classes.menuItem}>
              <Link href="/characters">
                <a>characters</a>
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link href="/movies">
                <a>movies</a>
              </Link>
            </li>
            <li className={classes.menuItem}>
              <Link href="/tv-shows">
                <a>tv shows</a>
              </Link>
            </li>
            <li className={classes.menuItem}>
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
