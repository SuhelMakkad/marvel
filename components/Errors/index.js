import styles from "./Styles.module.css";

export default function Error({ title }) {
  return (
    <div className={styles.stripe}>
      <div className={styles.stripeInner}>{title}</div>
    </div>
  );
}
