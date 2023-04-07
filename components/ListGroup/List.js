import Link from "next/link";

import styles from "./Styles.module.css";

export default function List({ heading, items }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>
        <Link href={`/${heading}`} legacyBehavior>
          {heading}
        </Link>
      </h2>

      <ul className={styles.list}>
        {items && items.length
          ? items.map((item) => (
              <li key={item.resourceURI}>
                <Link href={`${item.resourceURI.split("/public")[1]}`} className={styles.text}>
                  {item.name}
                </Link>
              </li>
            ))
          : "No data to show"}
      </ul>
    </div>
  );
}
