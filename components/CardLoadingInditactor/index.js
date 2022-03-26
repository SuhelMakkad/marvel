import styles from "./Styles.module.css";

export default function CardLoadingInditactor({ color, className }) {
  return (
    <div style={{ "--dot-color": color }} className={`${styles.dotBricks} ${className}`}></div>
  );
}
