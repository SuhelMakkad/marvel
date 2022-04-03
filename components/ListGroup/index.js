import List from "./List";

import styles from "./Styles.module.css";

export default function ListGroup({ items }) {
  console.log(items);
  items = items.filter(([_, item]) => item);

  if (!items || !items.length) {
    return "";
  }

  return (
    <div className={styles.mainWrapper}>
      {items.map(([name, item]) => (
        <ul key={name} className={`${styles.list} ${styles[name]}`}>
          <li className={styles.listChild}>
            <List heading={name} items={item.items} />
          </li>
        </ul>
      ))}
    </div>
  );
}
