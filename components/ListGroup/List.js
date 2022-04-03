import Link from "next/link";

import styles from "./Styles.module.css";

export default function List({ heading, items }) {
  return (
    <div className={styles.wrapper}>
      <Link href={`/${heading}`}>
        <a>
          <h2 className={styles.heading}>{heading}</h2>
        </a>
      </Link>

      <ul className={styles.list}>
        {items && items.length
          ? items.map((item) => (
              <li key={item.resourceURI}>
                <Link href={`${item.resourceURI.split("/public")[1]}`}>
                  <a>
                    <span className={styles.text}>{item.name}</span>
                  </a>
                </Link>
              </li>
            ))
          : "No data to show"}
      </ul>
    </div>
  );
}
