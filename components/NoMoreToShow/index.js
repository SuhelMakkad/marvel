import styles from "./Styles.module.css";

export default function NoMoreToShow() {
  return (
    <div className={styles.text}>
      <p>No More Items to Show </p>
      <p className={styles.textBreath}>¯\_(ツ)_/¯</p>
    </div>
  );
}
